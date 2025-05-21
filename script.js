// script.js
document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            // Check if it's a simple hash link on the current page (e.g. #about, not projects.html#project-goal-1)
            // This ensures it only tries to smooth scroll for same-page anchors.
            // Cross-page anchors will navigate normally and then potentially be handled by highlight on arrival.
            if (href.length > 1 && href.startsWith('#') && !this.pathname.includes('.html') && (window.location.pathname === this.pathname || "/" + window.location.pathname.split('/').pop() === this.pathname)) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. "Back to Top" Button
    const backToTopButton = document.getElementById('backToTopBtn');
    const scrollThreshold = 300; // Show button after scrolling this many pixels

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Active Navigation Link Highlighting (primarily for index.html sections)
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"], header nav ul li a[href^="index.html#"]');
    const sections = [];
    let headerOffset = 0;
    const header = document.querySelector('header');

    if (header) {
        // headerOffset is useful if you have a fixed/sticky header that obscures the top of sections.
        // If your header scrolls away, you might want a smaller offset (e.g., 20) or 0.
        headerOffset = header.offsetHeight + 20;
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let targetId;

        if (href.includes('#')) {
            targetId = href.substring(href.indexOf('#') + 1);
        }

        // Only process links that are for the current page's sections (primarily for index.html)
        // This check assumes index.html links are like '#section' or 'index.html#section'
        // and we are on index.html (or a page that behaves like it).
        if (targetId && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
            const section = document.getElementById(targetId);
            if (section) {
                sections.push({ link: link, element: section });
            }
        }
    });

    // Only add scroll listener if we are on index.html (or a similar page) and have sections to track
    if (sections.length > 0 && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
        const highlightActiveLink = () => {
            let currentSectionId = null;
            const scrollPosition = window.scrollY + headerOffset;

            sections.forEach(sectionObj => {
                if (scrollPosition >= sectionObj.element.offsetTop &&
                    scrollPosition < sectionObj.element.offsetTop + sectionObj.element.offsetHeight) {
                    currentSectionId = sectionObj.element.id;
                }
            });

            sections.forEach(sectionObj => { // Iterate through tracked sections/links
                sectionObj.link.classList.remove('active-link');
                if (sectionObj.element.id === currentSectionId) {
                    sectionObj.link.classList.add('active-link');
                }
            });

            // If at the very top, before the first section is "active"
            if (currentSectionId === null && window.scrollY < (sections[0]?.element.offsetTop - headerOffset || 0)) {
                sections.forEach(s => s.link.classList.remove('active-link'));
                if (sections[0]?.link.getAttribute('href').includes('#intro')) { // Specifically activate 'intro' link if at top
                    sections[0]?.link.classList.add('active-link');
                }
            }
        };

        window.addEventListener('scroll', highlightActiveLink);
        window.addEventListener('resize', highlightActiveLink); // Recalculate on resize
        highlightActiveLink(); // Initial call to set active link on page load
    }

// 4. Highlight section/element if linked via hash on the current page
    if (window.location.hash) { // Check if there's any hash in the URL
        const elementId = window.location.hash.substring(1);
        const targetElement = document.getElementById(elementId);

        if (targetElement) {
            // Smooth scroll to the element and center it.
            // The smooth scroll for same-page links (part 1 of script) might also handle this if clicked,
            // but this ensures it happens on direct load with a hash.
            // We need to be careful not to have two scrollIntoView calls fighting.
            // Let's make this one conditional or ensure it doesn't conflict.
            // For now, the browser's default jump to hash + this smooth scroll will likely resolve okay.
            // A more robust solution might integrate this into the smooth scroll handler.

            // We'll use a slight delay for scrollIntoView to ensure the page has settled from the hash jump
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100); // Small delay

            targetElement.classList.add('highlighted-project');
            setTimeout(() => {
                targetElement.classList.remove('highlighted-project');
            }, 2500); // Match animation duration
        }
    }
    
}); // End of DOMContentLoaded
