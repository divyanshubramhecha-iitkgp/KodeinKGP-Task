const fs = require('fs');
const path = require('path');

const illPath = path.join(__dirname, '..', 'illustration.html');
let html = fs.readFileSync(illPath, 'utf8');

// 1. Add dark mode search styling to illustration.html if not present
const searchCss = `
        /* Enhanced Search Styles */
        .dark .search {
            background-color: #374151;
            border-color: #4b5563;
        }
        .dark .search input {
            color: #f9fafb !important;
        }
        .dark .search input::placeholder {
            color: #9ca3af !important;
        }
        .search-container:focus-within .search {
            border-color: #111111;
            box-shadow: 0 0 0 1px #111111;
            background-color: #ffffff;
        }
        .dark .search-container:focus-within .search {
            border-color: #f9fafb;
            box-shadow: 0 0 0 1px #f9fafb;
            background-color: #1f2937;
        }
        .search-suggestions-box {
            animation: fadeInDropdown 0.15s ease-out;
        }
        @keyframes fadeInDropdown {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }
`;

if (!html.includes('/* Enhanced Search Styles */')) {
    html = html.replace('.dark .sidebar {', searchCss + '\n        .dark .sidebar {');
}

// 2. Replace search bar markup
const oldSearchMarkup = `<div class="search flex-grow flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2">
                        <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input class="w-full bg-transparent focus:outline-none" type="search" placeholder="Search photos and illustrations" aria-label="Search" />
                        <svg class="w-5 h-5 text-gray-400 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </div>`;

const newSearchMarkup = `<div class="search-container flex-grow max-w-3xl relative">
                        <div class="search flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2 transition-all duration-200">
                            <svg class="w-5 h-5 text-gray-400 mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input id="search-input" class="w-full bg-transparent focus:outline-none text-sm md:text-base text-gray-900 dark:text-gray-100" type="search" placeholder="Search illustrations (e.g. 3D, wallpaper, flat, icon)..." aria-label="Search" autocomplete="off" />
                            <button id="search-clear-btn" class="hidden text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full focus:outline-none transition-colors" title="Clear search" aria-label="Clear search">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <span class="search-shortcut hidden lg:inline-flex items-center text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5 ml-1 select-none font-mono" title="Press / to search">/</span>
                        </div>

                        <!-- Dropdown for Suggestions -->
                        <div id="search-suggestions" class="search-suggestions-box hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 z-50">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular Illustration Categories</div>
                            </div>
                            <div class="flex flex-wrap gap-2" id="trending-tags-container">
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">3D</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Wallpapers</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Flat</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Hand Drawn</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Icons</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Line Art</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Patterns</button>
                            </div>
                        </div>
                    </div>`;

if (html.includes(oldSearchMarkup)) {
    html = html.replace(oldSearchMarkup, newSearchMarkup);
}

// 3. Add search banner in illustration.html
const bannerMarkup = `
            <!-- Search Results Status Banner -->
            <div id="search-banner" class="hidden container mx-auto px-4 md:px-6 pt-4 pb-1">
                <div class="flex items-center justify-between flex-wrap gap-2 py-2.5 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500 dark:text-gray-400">Showing results for:</span>
                        <span id="search-query-display" class="font-semibold text-gray-900 dark:text-white"></span>
                        <span id="search-count-badge" class="ml-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black"></span>
                    </div>
                    <button id="reset-search-btn" class="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center space-x-1 py-1 px-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>Clear search</span>
                    </button>
                </div>
            </div>
`;

if (!html.includes('id="search-banner"')) {
    html = html.replace('</header>', '</header>' + bannerMarkup);
}

// 4. Update the illustration script logic to handle search
const illScriptSearchLogic = `
            // --- SEARCH LOGIC ---
            const searchInput = document.getElementById('search-input');
            const searchClearBtn = document.getElementById('search-clear-btn');
            const searchSuggestions = document.getElementById('search-suggestions');
            const searchBanner = document.getElementById('search-banner');
            const searchQueryDisplay = document.getElementById('search-query-display');
            const searchCountBadge = document.getElementById('search-count-badge');
            const resetSearchBtn = document.getElementById('reset-search-btn');
            let activeQuery = '';
            let activeCategory = 'Featured';

            const applyIllustrationFilters = () => {
                const q = activeQuery.toLowerCase().trim();
                const terms = q ? q.split(/\\s+/).filter(Boolean) : [];

                let result = activeCategory === 'Featured'
                    ? illustrationData
                    : illustrationData.filter(item => item.category === activeCategory);

                if (terms.length > 0) {
                    result = result.filter(item => {
                        const alt = (item.alt || '').toLowerCase();
                        const cat = (item.category || '').toLowerCase();
                        const author = ((item.author && item.author.name) || '').toLowerCase();
                        const combined = \`\${alt} \${cat} \${author}\`;
                        return terms.every(t => combined.includes(t));
                    });

                    if (searchBanner && searchQueryDisplay && searchCountBadge) {
                        searchBanner.classList.remove('hidden');
                        searchQueryDisplay.textContent = \`"\${activeQuery}"\`;
                        searchCountBadge.textContent = \`\${result.length} \${result.length === 1 ? 'illustration' : 'illustrations'}\`;
                    }
                } else {
                    if (searchBanner) searchBanner.classList.add('hidden');
                }

                if (searchClearBtn) searchClearBtn.classList.toggle('hidden', !q);

                if (!masonryGrid) return;
                if (result.length === 0) {
                    const cleanQ = activeQuery.replace(/[&<>"']/g, '');
                    masonryGrid.innerHTML = \`
                        <div style="column-span:all" class="text-center py-20 px-4 w-full">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">No illustrations found \${cleanQ ? \`for "\${cleanQ}"\` : ''}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">Looking for photos instead? <a href="index.html" class="underline text-black dark:text-white font-medium">Search the photo gallery</a></p>
                            <div class="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                                <button type="button" class="ill-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition">3D</button>
                                <button type="button" class="ill-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition">Wallpapers</button>
                                <button type="button" class="ill-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition">Flat</button>
                                <button type="button" class="ill-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition">Hand Drawn</button>
                            </div>
                        </div>\`;

                    masonryGrid.querySelectorAll('.ill-chip').forEach(btn => {
                        btn.addEventListener('click', () => {
                            setSearchQuery(btn.textContent.trim());
                        });
                    });
                } else {
                    renderPhotos(result);
                }
            };

            const setSearchQuery = (val) => {
                activeQuery = val;
                if (searchInput) searchInput.value = val;
                if (searchSuggestions) searchSuggestions.classList.add('hidden');
                applyIllustrationFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // Debounce
            const debounce = (fn, delay) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => fn(...args), delay);
                };
            };

            if (searchInput) {
                searchInput.addEventListener('input', debounce((e) => {
                    activeQuery = e.target.value.trim();
                    applyIllustrationFilters();
                }, 200));
                searchInput.addEventListener('focus', () => {
                    if (searchSuggestions && !activeQuery) searchSuggestions.classList.remove('hidden');
                });
            }

            if (searchClearBtn) {
                searchClearBtn.addEventListener('click', () => setSearchQuery(''));
            }
            if (resetSearchBtn) {
                resetSearchBtn.addEventListener('click', () => setSearchQuery(''));
            }

            document.querySelectorAll('.suggestion-chip').forEach(chip => {
                chip.addEventListener('click', () => setSearchQuery(chip.textContent.trim()));
            });

            document.addEventListener('click', (e) => {
                if (searchSuggestions && !e.target.closest('.search-container')) {
                    searchSuggestions.classList.add('hidden');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && document.activeElement !== searchInput) {
                    e.preventDefault();
                    if (searchInput) { searchInput.focus(); searchInput.select(); }
                }
                if (e.key === 'Escape') {
                    if (searchSuggestions) searchSuggestions.classList.add('hidden');
                    if (searchInput) searchInput.blur();
                }
            });
`;

if (!html.includes('applyIllustrationFilters')) {
    html = html.replace('// Initial render of all illustrations', illScriptSearchLogic + '\n            // Initial render of all illustrations');
}

fs.writeFileSync(illPath, html, 'utf8');
console.log('Done updating illustration.html');
