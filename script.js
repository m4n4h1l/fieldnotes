// script.js
document.addEventListener('DOMContentLoaded', () => {
    // All our JavaScript code will go in here
});

// Inside the DOMContentLoaded event listener:

    // 1. Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Check if it's a simple hash link on the current page
            if (href.length > 1 && href.startsWith('#')) {
                const targetId = href.substring(1); // Remove the '#'
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    event.preventDefault(); // Prevent default jump
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // If the link is just "#", do nothing or allow default (often reloads)
            // If the link is like "index.html#section", this code won't interfere with page navigation
            // and will only smooth scroll if the target is on the *current* page.
        });
    });

// Inside the DOMContentLoaded event listener:

    // 2. "Back to Top" Button
    const backToTopButton = document.getElementById('backToTopBtn');
    const scrollThreshold = 300; // Show button after scrolling this many pixels

    if (backToTopButton) { // Check if the button exists on the page
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

// Inside the DOMContentLoaded event listener:

    // 3. Active Navigation Link Highlighting (for index.html sections)
    // This part should ideally only run on index.html or pages with these sections and nav links
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]'); // Links pointing to sections
    const sections = [];

    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            sections.push({link: link, element: section});
        }
    });

    // Only add scroll listener if we are on a page with these sections
    // A simple check could be if the 'intro' section exists, assuming it's unique to index.html
    if (document.getElementById('intro') && sections.length > 0) {
        const offset = 100; // Adjust this offset as needed (e.g., height of your header)

        window.addEventListener('scroll', () => {
            let currentSectionId = null;
            const scrollPosition = window.scrollY + offset;

            sections.forEach(sectionObj => {
                if (scrollPosition >= sectionObj.element.offsetTop &&
                    scrollPosition < sectionObj.element.offsetTop + sectionObj.element.offsetHeight) {
                    currentSectionId = sectionObj.element.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href').substring(1) === currentSectionId) {
                    link.classList.add('active-link');
                }
            });

            // Special case for the top of the page (e.g., 'Home' or 'intro' link)
            // If no section is actively "current" by the logic above (e.g., between sections or very top)
            // you might want to ensure the first link is active if scrollPosition is near the top.
            if (currentSectionId === null && window.scrollY < sections[0]?.element.offsetTop - offset) {
                navLinks.forEach(link => link.classList.remove('active-link')); // Clear all
                sections[0]?.link.classList.add('active-link'); // Activate the first link
            }
        });

        // Trigger it once on load in case the page is loaded scrolled or with a hash
        // Use a slight delay to ensure layout is fully stable
        setTimeout(() => {
             window.dispatchEvent(new Event('scroll'));
        }, 100);
    }
