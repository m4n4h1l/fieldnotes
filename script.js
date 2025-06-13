document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for internal links on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is meant for the current page
            if (this.hash !== "") {
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. "Back to Top" Button
    const backToTopButton = document.getElementById('backToTopBtn');
    if (backToTopButton) {
        const scrollThreshold = 300;
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Active Navigation Link Highlighting (for index.html)
    const sections = document.querySelectorAll('main > section[id]');
    const navLinks = document.querySelectorAll('.main-navigation a[href*="#"]');
    if (sections.length > 0 && navLinks.length > 0 && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
        const headerOffset = document.querySelector('.site-header')?.offsetHeight + 20 || 70;
        const highlightActiveLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - headerOffset) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.href.includes(current)) {
                    link.classList.add('active-link');
                }
            });
        };
        window.addEventListener('scroll', highlightActiveLink);
        window.addEventListener('resize', highlightActiveLink);
        highlightActiveLink();
    }

    // 4. Highlight element if linked via hash on page load
    if (window.location.hash) {
        const targetElement = document.getElementById(window.location.hash.substring(1));
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            targetElement.classList.add('highlighted-project');
            setTimeout(() => {
                targetElement.classList.remove('highlighted-project');
            }, 2500);
        }
    }

    // 5. Animate elements on scroll
    const animatedElements = document.querySelectorAll('.anim-on-scroll, .flowchart-node');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }

    // 6. Responsive Navigation Toggle (Hamburger Menu)
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-navigation');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
        mainNav.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                document.body.classList.remove('nav-open');
            }
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});