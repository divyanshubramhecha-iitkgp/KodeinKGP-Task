const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add cms-data.js in head if not already present
if (!html.includes('<script src="cms-data.js"></script>')) {
    html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>\n    <script src="cms-data.js"></script>');
}

// 2. Add custom CSS for search bar focus, dark mode and dropdown
const searchCss = `
        /* Enhanced Search Bar & Dropdown Styles */
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

if (!html.includes('/* Enhanced Search Bar & Dropdown Styles */')) {
    html = html.replace('.dark .search {', searchCss + '\n        .dark .search {');
}

// 3. Update desktop header search bar and mobile header search bar
// Find the header section
const oldHeaderStart = '<header class="site-header sticky top-0 bg-white z-10 shadow-sm mobile-header-bg">';
const oldHeaderEnd = '</header>';
const headerStartIndex = html.indexOf(oldHeaderStart);
const headerEndIndex = html.indexOf(oldHeaderEnd, headerStartIndex) + oldHeaderEnd.length;

if (headerStartIndex === -1 || headerEndIndex === -1) {
    console.error('Could not find header in index.html');
    process.exit(1);
}

const newHeader = `<header class="site-header sticky top-0 bg-white z-20 shadow-sm mobile-header-bg">
                <!-- Mobile Topbar -->
                <div class="md:hidden flex items-center justify-between px-4 h-16 border-b">
                    <a href="#" class="mobile-logo" aria-label="Unsplash home">
                        <img class="h-8 w-auto" src="https://www.svgrepo.com/show/315538/unsplash.svg" alt="Logo" />
                    </a>
                    <div class="mobile-actions flex items-center space-x-2">
                        <button class="icon-btn p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Notifications">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 3a5 5 0 0 0-5 5v3.5c0 .6-.2 1.2-.6 1.6L5 14.5V16h14v-1.5l-1.4-1.4c-.4-.4-.6-1-.6-1.6V8a5 5 0 0 0-5-5z"
                                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
                                <path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" stroke-width="1.6"
                                    stroke-linecap="round" />
                            </svg>
                        </button>
                        <div class="mobile-avatar w-8 h-8 bg-gray-300 rounded-full" aria-hidden="true"></div>
                        <button class="icon-btn nav-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Menu"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Search Bar -->
                <div class="md:hidden px-4 py-2 border-b bg-gray-50 dark:bg-gray-900/60">
                    <div class="search flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5">
                        <svg class="w-4 h-4 text-gray-400 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input id="mobile-search-input" class="w-full bg-transparent focus:outline-none text-sm text-gray-900 dark:text-gray-100" type="search"
                            placeholder="Search photos & keywords..." aria-label="Search photos" autocomplete="off" />
                        <button id="mobile-search-clear-btn" class="hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full focus:outline-none" aria-label="Clear search">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Desktop Header -->
                <div class="header-inner container mx-auto px-4 hidden md:flex items-center h-20">
                    <div class="search-container flex-grow max-w-3xl relative">
                        <div class="search flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2 transition-all duration-200">
                            <svg class="w-5 h-5 text-gray-400 mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input id="search-input" class="w-full bg-transparent focus:outline-none text-sm md:text-base text-gray-900 dark:text-gray-100" type="search"
                                placeholder="Search high-resolution photos, keywords (e.g. mountain, car, neon)..." aria-label="Search" autocomplete="off" />
                            <button id="search-clear-btn" class="hidden text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full focus:outline-none transition-colors" title="Clear search" aria-label="Clear search">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <span class="search-shortcut hidden lg:inline-flex items-center text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5 ml-1 select-none font-mono" title="Press / to search">/</span>
                        </div>

                        <!-- Dropdown for Suggestions / Trending Keywords -->
                        <div id="search-suggestions" class="search-suggestions-box hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 z-50">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Trending Searches</div>
                                <span class="text-xs text-gray-400">Click to explore</span>
                            </div>
                            <div class="flex flex-wrap gap-2" id="trending-tags-container">
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Mountain</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Tokyo</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Car</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Coffee</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Sunset</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Cyberpunk</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Neon</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Minimalist</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Ocean</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Portrait</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Architecture</button>
                                <button type="button" class="suggestion-chip px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition">Nature</button>
                            </div>
                        </div>
                    </div>
                    <nav class="nav ml-8" aria-label="Primary">
                        <ul class="nav-list flex items-center space-x-6">
                            <li><a href="#" class="link text-gray-600 hover:text-black">Unsplash+</a></li>
                            <li><a href="#"
                                    class="submit-btn px-4 py-2 rounded-md font-medium bg-white text-black border border-gray-300 hover:border-black transition-colors duration-300">Submit
                                    an image</a></li>
                        </ul>
                    </nav>
                </div>

                <!-- Tabs -->
                <div class="tabs border-b overflow-x-auto">
                    <div class="tabs-inner container mx-auto px-4 flex items-center h-14 space-x-6">
                        <button class="tab active py-4 font-medium" data-category="Featured">Featured</button>
                        <button class="tab py-4" data-category="Wallpapers">Wallpapers</button>
                        <button class="tab py-4" data-category="Nature">Nature</button>
                        <button class="tab py-4" data-category="3D Renders">3D Renders</button>
                        <button class="tab py-4" data-category="Textures">Textures</button>
                        <button class="tab py-4" data-category="Travel">Travel</button>
                        <button class="tab py-4" data-category="Film">Film</button>
                        <button class="tab py-4" data-category="People">People</button>
                        <button class="tab py-4" data-category="Architecture and Interior">Architecture and Interior</button>
                        <button class="tab py-4" data-category="Street Photography">Street Photography</button>
                        <button class="tab py-4" data-category="Experimental">Experimental</button>
                    </div>
                </div>
            </header>

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
            </div>`;

html = html.slice(0, headerStartIndex) + newHeader + html.slice(headerEndIndex);

// 4. Update the main script block
const newScript = `    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- DOM REFERENCES ---
            const tabs = document.querySelectorAll('.tab');
            const masonryGrid = document.getElementById('masonry-grid');
            const searchInput = document.getElementById('search-input');
            const mobileSearchInput = document.getElementById('mobile-search-input');
            const searchClearBtn = document.getElementById('search-clear-btn');
            const mobileSearchClearBtn = document.getElementById('mobile-search-clear-btn');
            const searchSuggestions = document.getElementById('search-suggestions');
            const searchBanner = document.getElementById('search-banner');
            const searchQueryDisplay = document.getElementById('search-query-display');
            const searchCountBadge = document.getElementById('search-count-badge');
            const resetSearchBtn = document.getElementById('reset-search-btn');

            // --- STATE ---
            // Initialize from offline fallback if available
            let allPhotoData = (typeof window.CMS_DATA !== 'undefined' && Array.isArray(window.CMS_DATA)) ? window.CMS_DATA : [];
            let activeCategory = 'Featured';
            let activeQuery = '';

            const popularSuggestions = ['Mountain', 'Tokyo', 'Car', 'Sunset', 'Coffee', 'Cyberpunk', 'Neon', 'Ocean', 'Forest', 'Architecture', 'Vintage'];

            // --- PHOTO CARD COMPONENT ---
            const createPhotoCard = (photo) => {
                const title = photo.title || photo.alt || 'Photo';
                return \`
                    <figure class="photo-card group relative overflow-hidden rounded-lg">
                        <img class="rounded-lg w-full transition-transform duration-300 group-hover:scale-105" src="\${photo.imgSrc}" alt="\${photo.alt || title}" loading="lazy" />
                        <figcaption class="overlay rounded-lg flex flex-col justify-between">
                            <div class="actions top-right self-end flex items-center space-x-1">
                                <button class="control" aria-label="Like" title="Like"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1 8.64l-.1.1-.1-.1C10.14 6.8 7.1 7.24 5.9 9.4c-1 1.8-.4 4.13 1.2 5.4L12 18.7l4.9-3.9c1.6-1.27 2.2-3.6 1.2-5.4-1.2-2.16-4.24-2.6-6-.86z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></button>
                                <button class="control" aria-label="Add to collection" title="Add to collection"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="14" rx="2" stroke="#111" stroke-width="1.6"/><path d="M12 9v6" stroke="#111" stroke-width="1.6"/><path d="M9 12h6" stroke="#111" stroke-width="1.6"/></svg></button>
                            </div>
                            <div class="actions bottom-content flex flex-col space-y-2">
                                <div class="text-white text-sm font-semibold drop-shadow-md truncate">\${photo.title || ''}</div>
                                <div class="flex items-center justify-between">
                                    <div class="actions bottom-left flex items-center">
                                        <img class="avatar" src="\${photo.author.avatar}" alt="\${photo.author.name}'s avatar" />
                                        <div class="author ml-2">
                                            <div class="name font-medium">\${photo.author.name}</div>
                                            <div class="meta text-xs text-gray-200">\${photo.author.meta}</div>
                                        </div>
                                    </div>
                                    <div class="actions bottom-right">
                                        <button class="control" aria-label="Download" title="Download"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12" stroke="#111" stroke-width="1.6" stroke-linecap="round"/><path d="M7 11l5 5 5-5" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                                    </div>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                \`;
            };

            // --- RENDER GALLERY ---
            const renderPhotos = (photos, query = '') => {
                if (!masonryGrid) return;
                if (photos.length === 0) {
                    const cleanQ = query.replace(/[&<>"']/g, '');
                    masonryGrid.innerHTML = \`
                        <div style="column-span:all" class="text-center py-20 px-4 w-full">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">No matching photos found \${cleanQ ? \`for "\${cleanQ}"\` : ''}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">Try searching with different keywords, check for typos, or explore one of these popular searches:</p>
                            <div class="flex flex-wrap justify-center gap-2 max-w-md mx-auto" id="empty-state-chips">
                                \${popularSuggestions.map(s => \`<button type="button" class="empty-state-tag px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition">\${s}</button>\`).join('')}
                            </div>
                        </div>\`;

                    masonryGrid.querySelectorAll('.empty-state-tag').forEach(btn => {
                        btn.addEventListener('click', () => {
                            setSearchQuery(btn.textContent.trim());
                        });
                    });
                } else {
                    masonryGrid.innerHTML = photos.map(createPhotoCard).join('');
                }
            };

            // --- SEARCH & FILTER LOGIC ---
            const applyFilters = () => {
                const q = activeQuery.toLowerCase().trim();
                const terms = q ? q.split(/\\s+/).filter(Boolean) : [];

                let result = activeCategory === 'Featured'
                    ? allPhotoData
                    : allPhotoData.filter(p => p.category === activeCategory);

                if (terms.length > 0) {
                    result = result.filter(photo => {
                        const tags = Array.isArray(photo.tags) ? photo.tags.join(' ').toLowerCase() : '';
                        const title = (photo.title || '').toLowerCase();
                        const alt = (photo.alt || '').toLowerCase();
                        const cat = (photo.category || '').toLowerCase();
                        const author = ((photo.author && photo.author.name) || '').toLowerCase();
                        const desc = (photo.description || '').toLowerCase();
                        const combined = \`\${title} \${alt} \${cat} \${tags} \${author} \${desc}\`;

                        // Match if all query terms appear somewhere in the metadata
                        return terms.every(term => combined.includes(term));
                    });

                    // Update search banner
                    if (searchBanner && searchQueryDisplay && searchCountBadge) {
                        searchBanner.classList.remove('hidden');
                        searchQueryDisplay.textContent = \`"\${activeQuery}"\`;
                        searchCountBadge.textContent = \`\${result.length} \${result.length === 1 ? 'photo' : 'photos'}\`;
                    }
                } else {
                    if (searchBanner) searchBanner.classList.add('hidden');
                }

                // Toggle clear buttons
                if (searchClearBtn) searchClearBtn.classList.toggle('hidden', !q);
                if (mobileSearchClearBtn) mobileSearchClearBtn.classList.toggle('hidden', !q);

                renderPhotos(result, activeQuery);
            };

            // Set search query programmatically
            const setSearchQuery = (val) => {
                activeQuery = val;
                if (searchInput) searchInput.value = val;
                if (mobileSearchInput) mobileSearchInput.value = val;
                if (searchSuggestions) searchSuggestions.classList.add('hidden');
                applyFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // Debounce helper
            const debounce = (fn, delay) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => fn(...args), delay);
                };
            };

            // --- FETCH FROM CMS (cms-data.json) ---
            fetch('cms-data.json')
                .then(res => {
                    if (!res.ok) throw new Error('HTTP error ' + res.status);
                    return res.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        allPhotoData = data;
                        applyFilters();
                    }
                })
                .catch(err => {
                    console.log('Notice: Fallback to bundled CMS dataset', err.message);
                    if (allPhotoData.length > 0) {
                        applyFilters();
                    } else if (masonryGrid) {
                        masonryGrid.innerHTML = \`<div style="column-span:all" class="text-center py-24 text-red-400 w-full">Failed to load CMS data. Please open via local server: <code>python -m http.server 5500</code></div>\`;
                    }
                });

            // If we already have offline CMS data, render immediately
            if (allPhotoData.length > 0) {
                applyFilters();
            }

            // --- EVENT LISTENERS ---

            // Tab filtering
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const activeTab = document.querySelector('.tab.active');
                    if (activeTab) activeTab.classList.remove('active');
                    e.currentTarget.classList.add('active');
                    activeCategory = e.currentTarget.dataset.category;
                    applyFilters();
                });
            });

            // Live search handlers
            const handleSearchInput = (e) => {
                activeQuery = e.target.value.trim();
                // Synchronize both desktop & mobile inputs
                if (e.target === searchInput && mobileSearchInput) mobileSearchInput.value = e.target.value;
                if (e.target === mobileSearchInput && searchInput) searchInput.value = e.target.value;
                applyFilters();
            };

            if (searchInput) {
                searchInput.addEventListener('input', debounce(handleSearchInput, 200));
                searchInput.addEventListener('focus', () => {
                    if (searchSuggestions && !activeQuery) searchSuggestions.classList.remove('hidden');
                });
            }

            if (mobileSearchInput) {
                mobileSearchInput.addEventListener('input', debounce(handleSearchInput, 200));
            }

            // Clear search buttons
            if (searchClearBtn) {
                searchClearBtn.addEventListener('click', () => {
                    setSearchQuery('');
                    if (searchInput) searchInput.focus();
                });
            }

            if (mobileSearchClearBtn) {
                mobileSearchClearBtn.addEventListener('click', () => {
                    setSearchQuery('');
                    if (mobileSearchInput) mobileSearchInput.focus();
                });
            }

            if (resetSearchBtn) {
                resetSearchBtn.addEventListener('click', () => {
                    setSearchQuery('');
                });
            }

            // Click outside search container closes suggestions
            document.addEventListener('click', (e) => {
                if (searchSuggestions && !e.target.closest('.search-container')) {
                    searchSuggestions.classList.add('hidden');
                }
            });

            // Suggestion chips in dropdown
            document.querySelectorAll('.suggestion-chip').forEach(chip => {
                chip.addEventListener('click', (e) => {
                    e.preventDefault();
                    setSearchQuery(chip.textContent.trim());
                });
            });

            // Keyboard shortcut: '/' to focus search, 'Escape' to blur/close
            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && document.activeElement !== searchInput && document.activeElement !== mobileSearchInput) {
                    e.preventDefault();
                    if (searchInput && window.innerWidth >= 768) {
                        searchInput.focus();
                        searchInput.select();
                    } else if (mobileSearchInput) {
                        mobileSearchInput.focus();
                        mobileSearchInput.select();
                    }
                }
                if (e.key === 'Escape') {
                    if (searchSuggestions) searchSuggestions.classList.add('hidden');
                    if (searchInput) searchInput.blur();
                    if (mobileSearchInput) mobileSearchInput.blur();
                }
            });

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
    </script>`;

// Replace from <script> to </script> (the last script block)
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>') + '</script>'.length;

if (scriptStart === -1 || scriptEnd === -1) {
    console.error('Could not find script block in index.html');
    process.exit(1);
}

html = html.slice(0, scriptStart) + newScript + html.slice(scriptEnd);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Done! index.html updated successfully. Total lines:', html.split('\n').length);
