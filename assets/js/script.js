// 1. NAVBAR SCROLL DETECTION & AUTO-HIDE
// ============================================
function initializeNavbar() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    let ticking = false;

    function updateNavbar(scrollTop) {
        // Add solid background when scrolled past 50px
        if (scrollTop > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }

        // Auto-hide logic (only after scrolling past threshold)
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling DOWN - hide navbar
                header.classList.add('navbar-hidden');
                header.classList.remove('navbar-visible');
            } else {
                // Scrolling UP - show navbar
                header.classList.remove('navbar-hidden');
                header.classList.add('navbar-visible');
            }
        } else {
            // At top of page - always visible and transparent
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

    // Initialize on page load
    updateNavbar(window.pageYOffset || document.documentElement.scrollTop);
}

// ============================================
// 2. DYNAMIC BODY PADDING (PREVENTS OVERLAP)
// ============================================
function adjustBodyPadding() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
}

// ============================================
// 3. NAVIGATION ACTIVE STATE & UNDERLINE
// ============================================
function initNavigation() {
    const nav = document.querySelector('.navbar ul');
    if (!nav) return;
    
    // Prevent double initialization
    if (nav.dataset.navInit === '1') return;
    nav.dataset.navInit = '1';

    const links = Array.from(nav.querySelectorAll('a'));

    function setActive(link) {
        links.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
    }

    // Determine active page
    const currentPath = window.location.pathname.toLowerCase();
    let activeLink = null;

    // Match by pathname
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

    // Fallback to class-based detection
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

// ============================================
// 4. TYPED TEXT ANIMATION
// ============================================
let typedInstance = null; // Use a variable outside the function to track the instance

function initTypedText() {
    const element = document.querySelector('.typed-text');
    if (!element || typeof Typed === 'undefined') return;
    
    // 1. If an instance already exists, destroy it to prevent duplicates
    if (typedInstance) {
        typedInstance.destroy();
    }
    
    // 2. Initialize with showCursor: true
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
        showCursor: true,      // Must be true to see it!
        cursorChar: '|',       // You can customize the character here
        smartBackspace: true,
        startDelay: 500
    });
}

// ============================================
// 5. SCROLL ANIMATIONS (FADE-IN)
// ============================================
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

// ============================================
// 6. INITIALIZE EVERYTHING
// ============================================
function initAll() {
    initializeNavbar();
    adjustBodyPadding();
    initNavigation();
    initTypedText();
    initScrollAnimations();
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// Run when header is dynamically loaded
document.addEventListener('headerLoaded', () => {
    initializeNavbar();
    adjustBodyPadding();
    initNavigation();
});

// Run on window load - ensure Typed.js is fully loaded
window.addEventListener('load', () => {
    adjustBodyPadding();
});

// Keep padding synced on resize
window.addEventListener('resize', adjustBodyPadding);