// script.js
document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) {
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
    const scrollThreshold = 300;

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

    // 3. Active Navigation Link Highlighting (for index.html sections)
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    const sections = [];
    let headerOffset = 0;
    const header = document.querySelector('header');
    if(header) {
        headerOffset = header.offsetHeight + 20; // Height of fixed header + some buffer
    }


    navLinks.forEach(link => {
        // Ensure the link is for a section on the current page, not a link to another page's section
        if (document.querySelector(link.getAttribute('href'))) {
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                sections.push({link: link, element: section});
            }
        }
    });

    if (sections.length > 0 && sections.some(s => s.element.id === 'intro')) { // Check if we have sections and specifically 'intro'
        const highlightActiveLink = () => {
            let currentSectionId = null;
            const scrollPosition = window.scrollY + headerOffset; // Add headerOffset

            sections.forEach(sectionObj => {
                if (scrollPosition >= sectionObj.element.offsetTop &&
                    scrollPosition < sectionObj.element.offsetTop + sectionObj.element.offsetHeight) {
                    currentSectionId = sectionObj.element.id;
                }
            });

            navLinks.forEach(link => {
                // Only operate on links that are part of our 'sections' array
                if (sections.find(s => s.link === link)) {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href').substring(1) === currentSectionId) {
                        link.classList.add('active-link');
                    }
                }
            });

            // If at the very top, before the first section is "active" by the above logic
            if (currentSectionId === null && window.scrollY < (sections[0]?.element.offsetTop - headerOffset || 0) ) {
                 sections.forEach(s => s.link.classList.remove('active-link')); // Clear all relevant links
                 if(sections[0]?.link.getAttribute('href') === '#intro'){ // Specifically activate 'intro' link if at top
                     sections[0]?.link.classList.add('active-link');
                 }
            }
        };

        window.addEventListener('scroll', highlightActiveLink);
        window.addEventListener('resize', highlightActiveLink); // Recalculate on resize
        highlightActiveLink(); // Initial call
    }
});
