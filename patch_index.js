const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newScript = `    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- DOM REFERENCES ---
            const tabs = document.querySelectorAll('.tab');
            const masonryGrid = document.getElementById('masonry-grid');
            const searchInput = document.getElementById('search-input');

            // State
            let allPhotoData = [];
            let activeCategory = 'Featured';
            let activeQuery = '';

            // --- FUNCTIONS ---

            const createPhotoCard = (photo) => {
                return \`
                    <figure class="photo-card">
                        <img class="rounded-lg w-full" src="\${photo.imgSrc}" alt="\${photo.alt}" loading="lazy" />
                        <figcaption class="overlay rounded-lg flex flex-col justify-between">
                            <div class="actions top-right self-end">
                                <button class="control" aria-label="Like"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1 8.64l-.1.1-.1-.1C10.14 6.8 7.1 7.24 5.9 9.4c-1 1.8-.4 4.13 1.2 5.4L12 18.7l4.9-3.9c1.6-1.27 2.2-3.6 1.2-5.4-1.2-2.16-4.24-2.6-6-.86z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></button>
                                <button class="control" aria-label="Add to collection"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="14" rx="2" stroke="#111" stroke-width="1.6"/><path d="M12 9v6" stroke="#111" stroke-width="1.6"/><path d="M9 12h6" stroke="#111" stroke-width="1.6"/></svg></button>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="actions bottom-left flex items-center">
                                    <img class="avatar" src="\${photo.author.avatar}" alt="\${photo.author.name}'s avatar" />
                                    <div class="author ml-2">
                                        <div class="name font-medium">\${photo.author.name}</div>
                                        <div class="meta text-xs text-gray-200">\${photo.author.meta}</div>
                                    </div>
                                </div>
                                <div class="actions bottom-right">
                                    <button class="control" aria-label="Download"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12" stroke="#111" stroke-width="1.6" stroke-linecap="round"/><path d="M7 11l5 5 5-5" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                \`;
            };

            const renderPhotos = (photos) => {
                if (!masonryGrid) return;
                if (photos.length === 0) {
                    masonryGrid.innerHTML = \`
                        <div style="column-span:all" class="text-center py-24 text-gray-400 w-full">
                            <svg class="mx-auto mb-4 w-12 h-12 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <p class="text-lg font-medium">No results found</p>
                            <p class="text-sm mt-1">Try a different keyword or category</p>
                        </div>\`;
                } else {
                    masonryGrid.innerHTML = photos.map(createPhotoCard).join('');
                }
            };

            // Apply both category and search filters together
            const applyFilters = () => {
                const q = activeQuery.toLowerCase();
                let result = activeCategory === 'Featured'
                    ? allPhotoData
                    : allPhotoData.filter(p => p.category === activeCategory);

                if (q) {
                    result = result.filter(p =>
                        p.alt.toLowerCase().includes(q) ||
                        p.category.toLowerCase().includes(q) ||
                        p.author.name.toLowerCase().includes(q)
                    );
                }
                renderPhotos(result);
            };

            // Debounce helper
            const debounce = (fn, delay) => {
                let timer;
                return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
            };

            // --- FETCH FROM CMS (cms-data.json) ---
            fetch('cms-data.json')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to load cms-data.json');
                    return res.json();
                })
                .then(data => {
                    allPhotoData = data;
                    applyFilters();
                })
                .catch(err => {
                    console.error(err);
                    if (masonryGrid) masonryGrid.innerHTML = \`<div style="column-span:all" class="text-center py-24 text-red-400 w-full">Failed to load photos. Open via a local server: <code>npx serve .</code></div>\`;
                });

            // --- EVENT LISTENERS ---

            // Tab filtering
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    document.querySelector('.tab.active').classList.remove('active');
                    e.currentTarget.classList.add('active');
                    activeCategory = e.currentTarget.dataset.category;
                    applyFilters();
                });
            });

            // Live search (debounced 250ms)
            if (searchInput) {
                searchInput.addEventListener('input', debounce((e) => {
                    activeQuery = e.target.value.trim();
                    applyFilters();
                }, 250));
            }

            // Footer year
            const yearSpan = document.getElementById('footer-year');
            if (yearSpan) yearSpan.textContent = new Date().getFullYear();

            // Back to top
            const toTopBtn = document.querySelector('.to-top');
            const sidebarLogo = document.getElementById('sidebar-logo-link');
            const scrollToTop = (event) => { if (event) event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
            if (toTopBtn) {
                window.addEventListener('scroll', () => { toTopBtn.classList.toggle('is-visible', window.pageYOffset > 300); });
                toTopBtn.addEventListener('click', scrollToTop);
            }
            if (sidebarLogo) sidebarLogo.addEventListener('click', scrollToTop);

            // Mobile nav toggle
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) navToggle.addEventListener('click', () => console.log('Mobile menu toggled'));

            // Active sidebar icon
            const iconLinks = document.querySelectorAll('.icon-link');
            iconLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (!link.href || link.href.endsWith('#') || link.tagName === 'BUTTON') e.preventDefault();
                    iconLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });

            // Footer category links
            document.querySelectorAll('.footer-category-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cat = link.dataset.category;
                    tabs.forEach(t => { t.classList.remove('active'); if (t.dataset.category === cat) t.classList.add('active'); });
                    activeCategory = cat;
                    applyFilters();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
        });
    <\/script>`;

// Replace from <script> to </script> (the last script block)
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>') + '</script>'.length;

if (scriptStart === -1 || scriptEnd === -1) {
    console.error('Could not find script block!');
    process.exit(1);
}

html = html.slice(0, scriptStart) + newScript + html.slice(scriptEnd);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Done! index.html updated. Lines:', html.split('\n').length);
