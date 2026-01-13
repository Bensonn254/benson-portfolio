(function() {
    'use strict';

    const CONFIG = {
        PATHS: [
            '/assets/includes/header.html',
            'assets/includes/header.html',
            '../assets/includes/header.html'
        ],
        PLACEHOLDER_ID: 'header-placeholder'
    };

    function buildFallbackHeader() {
        const path = window.location.pathname.toLowerCase();
        const inAnnotation = path.includes('/annotation/');
        const prefix = inAnnotation ? '../' : '';
        
        return `
        <header>
            <nav class="navbar">
                <a href="${prefix}index.html" class="logo nav-delay-1">Port<span>folio</span></a>
                <ul>
                    <li class="nav-delay-2"><a href="${prefix}index.html" class="nav-home">Home</a></li>
                    <li class="nav-delay-3"><a href="${prefix}about.html" class="nav-about">About</a></li>
                    <li class="nav-delay-4"><a href="${prefix}projects.html" class="nav-projects">Projects</a></li>
                    <li class="nav-delay-5"><a href="${prefix}contact.html" class="nav-contact">Contact</a></li>
                </ul>
            </nav>
        </header>`;
    }

    async function loadHeader() {
        const placeholder = document.getElementById(CONFIG.PLACEHOLDER_ID);
        if (!placeholder) return;

        const isHttp = /^https?:$/i.test(window.location.protocol);
        if (!isHttp) {
            placeholder.innerHTML = buildFallbackHeader();
            document.dispatchEvent(new CustomEvent('headerLoaded'));
            return;
        }

        for (const path of CONFIG.PATHS) {
            try {
                const response = await fetch(path, { cache: 'no-cache' });
                if (!response.ok) continue;
                
                const html = await response.text();
                placeholder.innerHTML = html;
                document.dispatchEvent(new CustomEvent('headerLoaded'));
                return;
            } catch (err) {}
        }

        placeholder.innerHTML = buildFallbackHeader();
        document.dispatchEvent(new CustomEvent('headerLoaded'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
