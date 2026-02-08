/**
 * TESTIMONIALS SCRIPT - SPOTLIGHT CARD
 * - Renders quote + meta in a single spotlight card
 * - Supports dots + prev/next with optional auto-rotate
 */

const testimonials = [
    {
        name: "Josephine K.",
        role: "Thamani Bakery",
        date: "10 Jan, 2026",
        rating: 5.0,
        img: "/assets/Thamani_Bakery_Project/assets/images/thamani_cakes_hero.webp",
        text: "Benson delivered a high-quality POS system for Thamani Bakery. It streamlined our orders and inventory perfectly."
    },
    {
        name: "Kyle",
        role: "Kyle Pharmacy",
        date: "25 Jan, 2025",
        rating: 5.0,
        img: "/assets/images/kyle_pharmacy_small.jpg",
        text: "Benson's targeted web solution put Kyle Pharmacy on the map in Kitengela. Our local visibility and customer trust skyrocketed immediately!"
    },
    {
        name: "Sara M.",
        role: "E-Commerce Client",
        date: "05 Feb, 2025",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
        text: "The AI-driven recommendation engine is seamless. Sales conversions have increased by 40% since the platform launch."
    }
];

const CONFIG = {
    autoRotateInterval: 6000
};

const elements = {
    card: document.getElementById('testimonial-card'),
    text: document.getElementById('testimonial-text'),
    name: document.getElementById('testimonial-name'),
    role: document.getElementById('testimonial-role'),
    rating: document.getElementById('testimonial-rating'),
    date: document.getElementById('testimonial-date'),
    avatar: document.getElementById('testimonial-avatar'),
    prev: document.getElementById('testimonial-prev'),
    next: document.getElementById('testimonial-next'),
    dots: document.getElementById('testimonial-dots')
};

let state = {
    activeIndex: 0,
    timer: null
};

document.addEventListener('DOMContentLoaded', () => {
    if (!elements.card || !elements.text || !elements.dots) return;
    if (!Array.isArray(testimonials) || testimonials.length === 0) return;

    buildDots();
    render();
    bindControls();
    startAutoRotate();
});

function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .map(part => part.trim()[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function renderStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
    if (hasHalf) starsHtml += '<i class="fas fa-star-half-alt"></i>';

    return `${starsHtml} <span class="rating-value">${rating.toFixed(1)}</span>`;
}

function setAvatar(testimonial) {
    elements.avatar.innerHTML = '';
    if (!testimonial || !testimonial.img) {
        const initials = getInitials(testimonial?.name);
        const span = document.createElement('span');
        span.className = 'meta-initials';
        span.textContent = initials;
        elements.avatar.appendChild(span);
        return;
    }

    const img = new Image();
    img.alt = testimonial.name || 'Client photo';
    img.src = testimonial.img;
    img.onload = () => {
        elements.avatar.innerHTML = '';
        elements.avatar.appendChild(img);
    };
    img.onerror = () => {
        const initials = getInitials(testimonial.name);
        const span = document.createElement('span');
        span.className = 'meta-initials';
        span.textContent = initials;
        elements.avatar.innerHTML = '';
        elements.avatar.appendChild(span);
    };
}

function render() {
    const total = testimonials.length;
    const index = ((state.activeIndex % total) + total) % total;
    state.activeIndex = index;

    const t = testimonials[index];
    elements.text.textContent = t.text;
    elements.name.textContent = t.name;
    elements.role.textContent = t.role;
    elements.date.textContent = `on ${t.date}`;
    elements.rating.innerHTML = renderStars(t.rating);
    setAvatar(t);

    updateDots(index);
}

function buildDots() {
    elements.dots.innerHTML = '';
    testimonials.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'spotlight-dot';
        btn.setAttribute('aria-label', `Show testimonial ${i + 1}`);
        btn.addEventListener('click', () => {
            setActive(i);
            resetAutoRotate();
        });
        elements.dots.appendChild(btn);
    });
}

function updateDots(activeIndex) {
    const dots = elements.dots.querySelectorAll('.spotlight-dot');
    dots.forEach((dot, i) => {
        if (i === activeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function setActive(index) {
    state.activeIndex = index;
    render();
}

function next() {
    state.activeIndex = (state.activeIndex + 1) % testimonials.length;
    render();
}

function prev() {
    state.activeIndex = (state.activeIndex - 1 + testimonials.length) % testimonials.length;
    render();
}

function bindControls() {
    if (elements.prev) elements.prev.addEventListener('click', () => { prev(); resetAutoRotate(); });
    if (elements.next) elements.next.addEventListener('click', () => { next(); resetAutoRotate(); });

    elements.card.addEventListener('mouseenter', stopAutoRotate);
    elements.card.addEventListener('mouseleave', startAutoRotate);
}

function startAutoRotate() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stopAutoRotate();
    state.timer = setInterval(next, CONFIG.autoRotateInterval);
}

function stopAutoRotate() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
}

function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
}
