function initializeNavbar() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    let ticking = false;

    function updateNavbar(scrollTop) {
        if (scrollTop > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                header.classList.add('navbar-hidden');
                header.classList.remove('navbar-visible');
            } else {
                header.classList.remove('navbar-hidden');
                header.classList.add('navbar-visible');
            }
        } else {
            header.classList.remove('navbar-hidden');
            header.classList.add('navbar-visible');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavbar(scrollTop);
                ticking = false;
            });
            ticking = true;
        }
    });

    updateNavbar(window.pageYOffset || document.documentElement.scrollTop);
}

function adjustBodyPadding() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
}

function initNavigation() {
    const nav = document.querySelector('.navbar ul');
    if (!nav) return;
    
    if (nav.dataset.navInit === '1') return;
    nav.dataset.navInit = '1';

    const links = Array.from(nav.querySelectorAll('a'));

    function setActive(link) {
        links.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
    }

    const currentPath = window.location.pathname.toLowerCase();
    let activeLink = null;

    for (const link of links) {
        const href = link.getAttribute('href') || '';
        try {
            const url = new URL(href, window.location.href);
            const linkPath = url.pathname.toLowerCase().replace(/\/index\.html$/i, '/');
            const normalizedCurrent = currentPath.replace(/\/index\.html$/i, '/');
            
            if (linkPath === normalizedCurrent) {
                activeLink = link;
                break;
            }
        } catch (e) {}
    }

    if (!activeLink) {
        if (currentPath.includes('/about')) activeLink = nav.querySelector('.nav-about');
        else if (currentPath.includes('/expertise')) activeLink = nav.querySelector('.nav-expertise');
        else if (currentPath.includes('/projects')) activeLink = nav.querySelector('.nav-projects');
        else if (currentPath.includes('/annotation')) activeLink = nav.querySelector('.nav-annotation');
        else if (currentPath.includes('/contact')) activeLink = nav.querySelector('.nav-contact');
        else activeLink = nav.querySelector('.nav-home');
    }

    setActive(activeLink || links[0]);
}

let typedInstance = null;

function initTypedText() {
    const element = document.querySelector('.typed-text');
    if (!element || typeof Typed === 'undefined') return;
    
    if (typedInstance) {
        typedInstance.destroy();
    }
    
    typedInstance = new Typed('.typed-text', {
        strings: [
            'An Aspiring Web Developer,',
            'a Data Annotation Specialist,',
            'a Petroleum Engineer.'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 3000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true,
        startDelay: 500
    });
}

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .about');
    if (fadeElements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.3 }
    );

    fadeElements.forEach(el => observer.observe(el));
}

function initAll() {
    initializeNavbar();
    adjustBodyPadding();
    initNavigation();
    initTypedText();
    initScrollAnimations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

document.addEventListener('headerLoaded', () => {
    initializeNavbar();
    adjustBodyPadding();
    initNavigation();
});

window.addEventListener('load', () => {
    adjustBodyPadding();
});

window.addEventListener('resize', adjustBodyPadding);
