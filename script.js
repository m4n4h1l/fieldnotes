
document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
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

    // 3. Active Navigation Link Highlighting
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"], header nav ul li a[href^="index.html#"]');
    const sections = [];
    let headerOffset = 0;
    const header = document.querySelector('header');

    if (header) {
        headerOffset = header.offsetHeight + 20;
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let targetId;

        if (href.includes('#')) {
            targetId = href.substring(href.indexOf('#') + 1);
        }

        if (targetId && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
            const section = document.getElementById(targetId);
            if (section) {
                sections.push({ link: link, element: section });
            }
        }
    });

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

            sections.forEach(sectionObj => {
                sectionObj.link.classList.remove('active-link');
                if (sectionObj.element.id === currentSectionId) {
                    sectionObj.link.classList.add('active-link');
                }
            });

            if (currentSectionId === null && window.scrollY < (sections[0]?.element.offsetTop - headerOffset || 0)) {
                sections.forEach(s => s.link.classList.remove('active-link'));
                if (sections[0]?.link.getAttribute('href').includes('#intro')) {
                    sections[0]?.link.classList.add('active-link');
                }
            }
        };

        window.addEventListener('scroll', highlightActiveLink);
        window.addEventListener('resize', highlightActiveLink);
        highlightActiveLink();
    }

    // 4. Highlight section/element if linked via hash
    if (window.location.hash) {
        const elementId = window.location.hash.substring(1);
        const targetElement = document.getElementById(elementId);

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

});
