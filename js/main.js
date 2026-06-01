/* =========================================================
   Lisa's Café — main.js
   Vanilla JS, no dependencies, progressive enhancement.
   ========================================================= */
(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    document.addEventListener('DOMContentLoaded', () => {
        initMobileNav();
        initScrollReveal();
        initMenuFilters();
        initBackToTop();
        initLazyMap();
        initContactForm();
        initGalleryLightbox();
        initFooterYear();
    });

    /* ---------- Mobile navigation ---------- */
    function initMobileNav() {
        const header = $('.site-header');
        const toggle = $('.nav-toggle');
        const nav = $('#primary-nav');
        if (!header || !toggle || !nav) return;

        const close = () => {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu de navegação');
        };
        const open = () => {
            header.classList.add('nav-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fechar menu de navegação');
        };

        toggle.addEventListener('click', () => {
            header.classList.contains('nav-open') ? close() : open();
        });

        nav.addEventListener('click', (e) => {
            if (e.target.closest('a')) close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && header.classList.contains('nav-open')) {
                close();
                toggle.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (header.classList.contains('nav-open') && !header.contains(e.target)) close();
        });
    }

    /* ---------- Scroll reveal ---------- */
    function initScrollReveal() {
        const targets = $$('.reveal').concat(
            $$('.section-eyebrow, .section-title, .section-lead, .menu-category, .galeria-item, .sobre-card, .sobre-highlights li, .contact-form')
        );
        const unique = [...new Set(targets)];

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            unique.forEach(el => el.classList.add('reveal', 'is-visible'));
            return;
        }

        unique.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        unique.forEach(el => observer.observe(el));
    }

    /* ---------- Menu filters ---------- */
    function initMenuFilters() {
        const buttons = $$('.filter-button');
        const categories = $$('.menu-category');
        if (!buttons.length || !categories.length) return;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                buttons.forEach(b => {
                    const active = b === button;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-pressed', String(active));
                });

                categories.forEach(cat => {
                    const show = filter === 'all' || cat.dataset.category === filter;
                    if (show) {
                        cat.classList.remove('is-hidden');
                        if (!prefersReducedMotion) {
                            cat.classList.add('is-animating');
                            requestAnimationFrame(() => requestAnimationFrame(() => {
                                cat.classList.remove('is-animating');
                            }));
                        }
                    } else {
                        cat.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    /* ---------- Back to top ---------- */
    function initBackToTop() {
        const btn = $('.scroll-top');
        if (!btn) return;

        let ticking = false;
        const update = () => {
            btn.classList.toggle('is-visible', window.scrollY > 400);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });

        update();
    }

    /* ---------- Lazy Google Map ---------- */
    function initLazyMap() {
        const frame = $('#map-frame');
        const trigger = $('.map-load', frame || document);
        if (!frame || !trigger) return;

        trigger.addEventListener('click', () => {
            const src = frame.dataset.map;
            if (!src) return;
            const iframe = document.createElement('iframe');
            iframe.className = 'google-map';
            iframe.src = src;
            iframe.title = 'Mapa da localização do Lisa\'s Café';
            iframe.loading = 'lazy';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            frame.innerHTML = '';
            frame.appendChild(iframe);
        });
    }

    /* ---------- Contact form ---------- */
    function initContactForm() {
        const form = $('#contact-form');
        if (!form) return;

        const status = $('.form-status', form);
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const setError = (input, message) => {
            const errorEl = document.getElementById(`${input.id}-error`);
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.textContent = message;
        };
        const clearError = (input) => {
            const errorEl = document.getElementById(`${input.id}-error`);
            input.classList.remove('error');
            input.removeAttribute('aria-invalid');
            if (errorEl) errorEl.textContent = '';
        };

        // Live-clear errors as the user types
        $$('input, textarea', form).forEach(input => {
            input.addEventListener('input', () => clearError(input));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fields = [
                { el: $('#name', form),    test: v => v.trim().length > 0,        msg: 'Por favor, informe seu nome.' },
                { el: $('#email', form),   test: v => emailRe.test(v.trim()),     msg: 'Informe um email válido.' },
                { el: $('#subject', form), test: v => v.trim().length > 0,        msg: 'Por favor, informe o assunto.' },
                { el: $('#message', form), test: v => v.trim().length >= 5,       msg: 'Escreva uma mensagem (mín. 5 caracteres).' },
            ];

            let firstInvalid = null;
            fields.forEach(({ el, test, msg }) => {
                if (!el) return;
                if (test(el.value)) {
                    clearError(el);
                } else {
                    setError(el, msg);
                    if (!firstInvalid) firstInvalid = el;
                }
            });

            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            // Simulated submission (no backend in this static build)
            const submitBtn = $('.submit-button', form);
            if (submitBtn) submitBtn.disabled = true;
            status.textContent = 'Enviando mensagem…';
            status.className = 'form-status sending';

            setTimeout(() => {
                status.textContent = 'Mensagem enviada! Em breve entraremos em contato. 💛';
                status.className = 'form-status success';
                form.reset();
                if (submitBtn) submitBtn.disabled = false;
                setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 6000);
            }, 1200);
        });
    }

    /* ---------- Gallery lightbox (ready for real photos) ---------- */
    function initGalleryLightbox() {
        const items = $$('.galeria-item');
        if (!items.length) return;

        const openLightbox = (img) => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            lightbox.setAttribute('aria-label', img.alt || 'Imagem ampliada');

            const clone = img.cloneNode(true);
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.type = 'button';
            closeBtn.setAttribute('aria-label', 'Fechar');
            closeBtn.innerHTML = '&times;';

            lightbox.append(clone, closeBtn);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => lightbox.classList.add('is-open'));
            closeBtn.focus();

            const close = () => {
                lightbox.classList.remove('is-open');
                document.body.style.overflow = '';
                document.removeEventListener('keydown', onKey);
                setTimeout(() => lightbox.remove(), prefersReducedMotion ? 0 : 280);
            };
            const onKey = (e) => { if (e.key === 'Escape') close(); };

            closeBtn.addEventListener('click', close);
            lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
            document.addEventListener('keydown', onKey);
        };

        items.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return; // icon tiles are non-interactive
            item.style.cursor = 'zoom-in';
            item.addEventListener('click', () => openLightbox(img));
        });
    }

    /* ---------- Footer year ---------- */
    function initFooterYear() {
        const el = $('#year');
        if (el) el.textContent = String(new Date().getFullYear());
    }
})();
