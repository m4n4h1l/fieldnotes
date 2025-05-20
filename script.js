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

