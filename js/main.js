// Lisa's Café - Script Principal

document.addEventListener('DOMContentLoaded', function() {
    // Animação suave para elementos ao carregar a página
    animateOnScroll();
    
    // Inicializar menu mobile
    initMobileMenu();
    
    // Inicializar galeria com lightbox
    initGallery();
    
    // Botão voltar ao topo
    initBackToTop();
    
    // Animações de entrada para elementos do hero
    animateHero();
    
    // Filtros do menu
    initMenuFilters();
    
    // Inicializar mapa na seção de localização
    initMap();
    
    // Inicializar formulário de contato com validação
    initContactForm();
    
    // Animações adicionais para elementos da página
    initAdditionalAnimations();
});

// Animação de elementos ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in, .menu-item, .galeria-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar menu mobile com toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Inicializar galeria com lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Verificar se é um placeholder ou uma imagem real
            const imgElement = this.querySelector('img');
            if (!imgElement) return; // Se for placeholder, não faz nada
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const imgClone = imgElement.cloneNode(true);
            lightbox.appendChild(imgClone);
            
            // Botão de fechar
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            lightbox.appendChild(closeBtn);
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            
            // Animar abertura
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Fechar lightbox
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
}

// Botão voltar ao topo
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '&uarr;';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animações para o hero
function animateHero() {
    const heroTitle = document.querySelector('#hero-title');
    const heroText = document.querySelector('#hero p');
    const heroButton = document.querySelector('#hero .cta-button');
    
    if (heroTitle) heroTitle.classList.add('fade-in', 'visible');
    
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('fade-in', 'visible');
        }, 300);
    }
    
    if (heroButton) {
        setTimeout(() => {
            heroButton.classList.add('fade-in', 'visible');
        }, 600);
    }
}

// Filtros para o menu
function initMenuFilters() {
    const menuCategories = document.querySelectorAll('.menu-category');
    if (menuCategories.length === 0) return;
    
    // Criar botões de filtro
    const filterContainer = document.createElement('div');
    filterContainer.className = 'menu-filters';
    
    // Botão para mostrar todos
    const allButton = document.createElement('button');
    allButton.textContent = 'Todos';
    allButton.className = 'filter-button active';
    allButton.setAttribute('data-filter', 'all');
    filterContainer.appendChild(allButton);
    
    // Coletar categorias únicas
    const categories = [];
    menuCategories.forEach(category => {
        const categoryTitle = category.querySelector('h3');
        if (categoryTitle && !categories.includes(categoryTitle.textContent)) {
            categories.push(categoryTitle.textContent);
        }
    });
    
    // Criar botão para cada categoria
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'filter-button';
        button.setAttribute('data-filter', category);
        filterContainer.appendChild(button);
    });
    
    // Inserir filtros antes do container do menu
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer) {
        menuContainer.parentNode.insertBefore(filterContainer, menuContainer);
    }
    
    // Adicionar funcionalidade de filtro
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            menuCategories.forEach(category => {
                const categoryTitle = category.querySelector('h3');
                if (filter === 'all' || (categoryTitle && categoryTitle.textContent === filter)) {
                    category.style.display = 'block';
                    // Animar entrada
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Inicializar mapa na seção de localização
function initMap() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (!mapPlaceholder) return;
    
    // Criar elemento iframe para o Google Maps
    const mapIframe = document.createElement('iframe');
    mapIframe.className = 'google-map';
    mapIframe.setAttribute('src', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.356219553784!2d-43.18058672549636!3d-22.906392937666296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU0JzIzLjAiUyA0M8KwMTAnNDQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1627309374517!5m2!1spt-BR!2sbr');
    mapIframe.setAttribute('width', '100%');
    mapIframe.setAttribute('height', '450');
    mapIframe.setAttribute('style', 'border:0;');
    mapIframe.setAttribute('allowfullscreen', '');
    mapIframe.setAttribute('loading', 'lazy');
    mapIframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    
    // Substituir o placeholder pelo iframe
    mapPlaceholder.parentNode.replaceChild(mapIframe, mapPlaceholder);
    
    // Adicionar animação de entrada
    setTimeout(() => {
        mapIframe.classList.add('fade-in', 'visible');
    }, 300);
}

// Inicializar formulário de contato com validação
function initContactForm() {
    // Verificar se já existe uma seção de contato
    let contactSection = document.querySelector('#contato');
    
    // Se não existir, criar uma nova seção de contato
    if (!contactSection) {
        contactSection = document.createElement('section');
        contactSection.id = 'contato';
        contactSection.setAttribute('role', 'region');
        contactSection.setAttribute('aria-labelledby', 'contato-title');
        
        const contactTitle = document.createElement('h2');
        contactTitle.id = 'contato-title';
        contactTitle.textContent = 'Entre em Contato';
        contactSection.appendChild(contactTitle);
        
        const contactContainer = document.createElement('div');
        contactContainer.className = 'contato-container';
        
        // Criar formulário
        const form = document.createElement('form');
        form.id = 'contact-form';
        form.className = 'contact-form';
        form.setAttribute('novalidate', '');
        
        // Campos do formulário
        const formHTML = `
            <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" id="name" name="name" required>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <label for="subject">Assunto</label>
                <input type="text" id="subject" name="subject" required>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <label for="message">Mensagem</label>
                <textarea id="message" name="message" rows="5" required></textarea>
                <span class="error-message"></span>
            </div>
            <button type="submit" class="submit-button">Enviar Mensagem</button>
            <div class="form-status"></div>
        `;
        
        form.innerHTML = formHTML;
        contactContainer.appendChild(form);
        contactSection.appendChild(contactContainer);
        
        // Adicionar a seção de contato antes do footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.parentNode.insertBefore(contactSection, footer);
        } else {
            document.querySelector('main').appendChild(contactSection);
        }
    }
    
    // Adicionar validação ao formulário
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Limpar mensagens de erro anteriores
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.textContent = '');
        
        // Validar campos
        let isValid = true;
        
        // Nome
        const nameInput = form.querySelector('#name');
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Por favor, informe seu nome.');
            isValid = false;
        }
        
        // Email
        const emailInput = form.querySelector('#email');
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, informe seu email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, informe um email válido.');
            isValid = false;
        }
        
        // Assunto
        const subjectInput = form.querySelector('#subject');
        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Por favor, informe o assunto.');
            isValid = false;
        }
        
        // Mensagem
        const messageInput = form.querySelector('#message');
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Por favor, escreva sua mensagem.');
            isValid = false;
        }
        
        // Se todos os campos forem válidos, simular envio
        if (isValid) {
            const formStatus = form.querySelector('.form-status');
            formStatus.textContent = 'Enviando mensagem...';
            formStatus.className = 'form-status sending';
            
            // Simular envio (em um cenário real, aqui seria feita uma requisição AJAX)
            setTimeout(() => {
                formStatus.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                formStatus.className = 'form-status success';
                form.reset();
                
                // Limpar mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 1500);
        }
    });
    
    // Função para mostrar mensagem de erro
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        input.classList.add('error');
        
        // Remover classe de erro quando o usuário começar a digitar
        input.addEventListener('input', function() {
            this.classList.remove('error');
            errorElement.textContent = '';
        }, { once: true });
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Adicionar animação de entrada para o formulário
    const formElements = document.querySelectorAll('.form-group, .submit-button');
    formElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in', 'visible');
        }, 100 * index);
    });
}

// Animações adicionais para elementos da página
function initAdditionalAnimations() {
    // Adicionar efeito de hover nos itens do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Adicionar animação de contador para números (exemplo: estatísticas)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // duração em ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const counterInterval = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(counterInterval);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
    
    // Adicionar efeito de revelação progressiva para textos longos
    const longTexts = document.querySelectorAll('.sobre-texto p');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, 200 * index);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    longTexts.forEach(text => {
        text.classList.add('text-reveal');
        observer.observe(text);
    });
}

/**
 * Efeito Parallax
 * Adiciona efeito de profundidade ao rolar a página
 */
function initParallaxEffect() {
    const heroSection = document.getElementById('hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.3; // Ajuste a velocidade do efeito aqui
            
            // Aplica o efeito parallax
            heroSection.style.backgroundPositionY = `-${translateY}px`;
        });
    }
}