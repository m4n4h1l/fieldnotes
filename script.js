document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        // Ensure this link is meant for same-page scrolling
        const linkTarget = link.getAttribute('href');
        if (linkTarget && linkTarget.startsWith('#') && !link.href.includes('.html')) {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // 2. "Back to Top" Button
    const backToTopButton = document.getElementById('backToTopBtn');
    if (backToTopButton) {
        const scrollThreshold = 300; // Show button after scrolling this many pixels
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

    // 3. Active Navigation Link Highlighting (for index.html)
    // Only run this logic if we're on the main page with the sections to track
    if (document.querySelector('#hero') && document.querySelector('#goals')) {
        const navLinks = document.querySelectorAll('header nav ul li a[href*="#"]');
        const sections = [];
        let headerOffset = 0;
        const header = document.querySelector('.site-header'); // Use class for consistency

        if (header) {
            headerOffset = header.offsetHeight + 20;
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('#')) {
                const targetId = href.substring(href.indexOf('#'));
                const section = document.querySelector(targetId);
                if (section) {
                    sections.push({ link: link, element: section });
                }
            }
        });

        if (sections.length > 0) {
            const highlightActiveLink = () => {
                let currentSectionId = null;
                const scrollPosition = window.scrollY + headerOffset;

                sections.forEach(sectionObj => {
                    if (scrollPosition >= sectionObj.element.offsetTop &&
                        scrollPosition < sectionObj.element.offsetTop + sectionObj.element.offsetHeight) {
                        currentSectionId = sectionObj.element.id;
                    }
                });

                sections.forEach(sectionObj => {
                    if (sectionObj.element.id === currentSectionId) {
                        sectionObj.link.classList.add('active-link');
                    } else {
                        sectionObj.link.classList.remove('active-link');
                    }
                });
            };

            window.addEventListener('scroll', highlightActiveLink);
            window.addEventListener('resize', highlightActiveLink);
            highlightActiveLink(); // Initial call
        }
    }

    // 4. Highlight section/element if linked via hash on page load
    if (window.location.hash) {
        const elementId = window.location.hash.substring(1);
        const targetElement = document.getElementById(elementId);

        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100); // Small delay to ensure smooth scroll after page jump

            targetElement.classList.add('highlighted-project'); // This class triggers CSS animation
            setTimeout(() => {
                targetElement.classList.remove('highlighted-project');
            }, 2500); // Remove class after animation (2.5s)
        }
    }

    // 5. Animate elements on scroll (for flowchart nodes)
    const animatedElements = document.querySelectorAll('.flowchart-node, .anim-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: unobserve the element after it has animated in
                    // This prevents the animation from re-triggering if the user scrolls up and down
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Tell the observer to watch each of the flowchart nodes
        animatedElements.forEach(el => observer.observe(el));
    }

});