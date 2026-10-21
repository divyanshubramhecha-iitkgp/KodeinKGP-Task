const fs = require('fs');
const path = require('path');

function updateFile(filePath, isIndex) {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Configure Tailwind for class-based dark mode
    if (!html.includes("darkMode: 'class'")) {
        html = html.replace(
            '<script src="https://cdn.tailwindcss.com"></script>',
            '<script src="https://cdn.tailwindcss.com"></script>\n    <script>\n        tailwind.config = {\n            darkMode: \'class\'\n        };\n    </script>'
        );
    }

    // 2. Replace search CSS with comprehensive black text enforcement when selected / focused
    const oldCssSearchMatch = html.match(/\/\* Enhanced Search.*?\*\/[\s\S]*?@keyframes fadeInDropdown[\s\S]*?\}/);
    const newCss = `/* Enhanced Search Bar & Dropdown Styles */
        .search input,
        #search-input,
        #mobile-search-input {
            color: #111111 !important;
            -webkit-text-fill-color: #111111 !important;
            background-color: transparent !important;
        }
        .search input::placeholder,
        #search-input::placeholder,
        #mobile-search-input::placeholder {
            color: #6b7280 !important;
            -webkit-text-fill-color: #6b7280 !important;
            opacity: 1;
        }
        .search input:focus,
        #search-input:focus,
        #mobile-search-input:focus,
        .search input:active,
        .search-container:focus-within input,
        .search:focus-within input {
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
        }
        .search input::selection,
        #search-input::selection,
        #mobile-search-input::selection {
            background-color: #cbd5e1 !important;
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
        }
        .search-container:focus-within .search,
        .search:focus-within {
            border-color: #111111 !important;
            box-shadow: 0 0 0 1px #111111 !important;
            background-color: #ffffff !important;
        }
        .search-suggestions-box {
            animation: fadeInDropdown 0.15s ease-out;
        }
        @keyframes fadeInDropdown {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Dark mode overrides (only active when html has class="dark") */
        html.dark .search,
        .dark .search {
            background-color: #374151;
            border-color: #4b5563;
        }
        html.dark .search-container:focus-within .search,
        .dark .search-container:focus-within .search,
        html.dark .search:focus-within,
        .dark .search:focus-within {
            background-color: #1f2937 !important;
            border-color: #9ca3af !important;
            box-shadow: 0 0 0 1px #9ca3af !important;
        }
        html.dark .search input,
        .dark .search input,
        html.dark #search-input,
        .dark #search-input,
        html.dark #mobile-search-input,
        .dark #mobile-search-input {
            color: #f9fafb !important;
            -webkit-text-fill-color: #f9fafb !important;
        }
        html.dark .search input:focus,
        .dark .search input:focus,
        html.dark #search-input:focus,
        .dark #search-input:focus,
        html.dark #mobile-search-input:focus,
        .dark #mobile-search-input:focus {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }
        html.dark .search input::placeholder,
        .dark .search input::placeholder,
        html.dark #search-input::placeholder,
        .dark #search-input::placeholder {
            color: #9ca3af !important;
            -webkit-text-fill-color: #9ca3af !important;
        }
        html.dark .search input::selection,
        .dark .search input::selection,
        html.dark #search-input::selection,
        .dark #search-input::selection {
            background-color: #4b5563 !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }`;

    if (oldCssSearchMatch) {
        html = html.replace(oldCssSearchMatch[0], newCss);
    }

    // 3. Remove dark:text-gray-100 or text-gray-900 from search inputs in the HTML
    html = html.replace(/text-gray-900 dark:text-gray-100/g, 'text-black');

    // 4. In index.html, also add theme toggle listener if not present
    if (isIndex && !html.includes('themeToggleBtn.addEventListener')) {
        const themeScript = `
            // --- THEME TOGGLE FUNCTIONALITY ---
            const themeToggleBtn = document.getElementById('theme-toggle');
            const sunIcon = document.getElementById('sun-icon');
            const moonIcon = document.getElementById('moon-icon');

            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    if (sunIcon) sunIcon.classList.remove('hidden');
                    if (moonIcon) moonIcon.classList.add('hidden');
                } else {
                    document.documentElement.classList.remove('dark');
                    if (sunIcon) sunIcon.classList.add('hidden');
                    if (moonIcon) moonIcon.classList.remove('hidden');
                }
            };

            const savedTheme = localStorage.getItem('theme') || 'light';
            applyTheme(savedTheme);

            if (themeToggleBtn) {
                themeToggleBtn.addEventListener('click', () => {
                    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                });
            }
        `;
        html = html.replace("const yearSpan = document.getElementById('footer-year');", themeScript + "\n            const yearSpan = document.getElementById('footer-year');");
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated ${path.basename(filePath)} successfully.`);
}

updateFile(path.join(__dirname, '..', 'index.html'), true);
updateFile(path.join(__dirname, '..', 'illustration.html'), false);
