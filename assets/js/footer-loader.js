(function() {
    'use strict';

    const CONFIG = {
        PATHS: [
            '/assets/css/includes/footer.html',
            'assets/css/includes/footer.html',
            '../assets/css/includes/footer.html'
        ],
        PLACEHOLDER_ID: 'footer-placeholder'
    };

    function buildFallbackFooter() {
        return `
        <footer class="footer-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="footer-brand">
                            <h3 class="footer-logo">Benson Portfolio</h3>
                            <p class="footer-tagline">Full-Stack Web Developer</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <h4 class="footer-title">Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="/index.html">Home</a></li>
                            <li><a href="/about.html">About</a></li>
                            <li><a href="/projects.html">Projects</a></li>
                            <li><a href="/contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-md-12 mb-4">
                        <h4 class="footer-title">Contact</h4>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fa-solid fa-envelope"></i>
                                <a href="mailto:bensonannotations@gmail.com">bensonannotations@gmail.com</a>
                            </div>
                            <div class="contact-item">
                                <i class="fa-solid fa-phone"></i>
                                <a href="tel:+254743052401">+254 743 052 401</a>
                            </div>
                            <div class="contact-item">
                                <i class="fa-solid fa-map-marker-alt"></i>
                                <span>Nairobi, Kenya</span>
                            </div>
                        </div>
                        <div class="social-icons">
                            <a href="https://www.facebook.com/bensonn254" target="_blank" rel="noopener noreferrer" class="social-icon">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://github.com/Bensonn254" target="_blank" rel="noopener noreferrer" class="social-icon">
                                <i class="fa-brands fa-github"></i>
                            </a>
                            <span class="social-icon social-disabled" aria-label="LinkedIn (Coming Soon)">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p class="copyright">© 2026 Benson. All rights reserved.</p>
                    <p class="built-with">Built with ❤️ in Nairobi</p>
                </div>
            </div>
        </footer>`;
    }

    async function loadFooter() {
        const placeholder = document.getElementById(CONFIG.PLACEHOLDER_ID);
        if (!placeholder) return;

        const isHttp = /^https?:$/i.test(window.location.protocol);
        if (!isHttp) {
            placeholder.innerHTML = buildFallbackFooter();
            document.dispatchEvent(new CustomEvent('footerLoaded'));
            return;
        }

        for (const path of CONFIG.PATHS) {
            try {
                const response = await fetch(path, { cache: 'no-cache' });
                if (!response.ok) continue;
                
                const html = await response.text();
                placeholder.innerHTML = html;
                document.dispatchEvent(new CustomEvent('footerLoaded'));
                return;
            } catch (err) {}
        }

        placeholder.innerHTML = buildFallbackFooter();
        document.dispatchEvent(new CustomEvent('footerLoaded'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();
