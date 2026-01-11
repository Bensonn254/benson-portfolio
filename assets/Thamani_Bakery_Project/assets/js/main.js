// Thamani Cakes Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Order Form WhatsApp Integration
    const orderForm = document.getElementById('quickOrderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(orderForm);
            const customerName = formData.get('customerName');
            const customerPhone = formData.get('customerPhone');
            const orderType = formData.get('orderType');
            const orderDetails = formData.get('orderDetails');
            const deliveryLocation = formData.get('deliveryLocation');
            const deliveryDate = formData.get('deliveryDate');
            
            // Validate required fields
            if (!customerName || !customerPhone || !orderType || !orderDetails || !deliveryDate) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Format order message for WhatsApp
            const orderMessage = formatOrderMessage({
                customerName,
                customerPhone,
                orderType,
                orderDetails,
                deliveryLocation,
                deliveryDate
            });
            
            // Send via WhatsApp
            const whatsappUrl = `https://wa.me/254743052401?text=${encodeURIComponent(orderMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show confirmation
            showOrderConfirmation();
        });
    }
    
    function formatOrderMessage(data) {
        const orderTypeLabels = {
            'birthday-cake': 'Birthday Cake',
            'wedding-cake': 'Wedding Cake',
            'cupcakes': 'Cupcakes & Mini Treats',
            'bread-pastries': 'Fresh Bread & Pastries',
            'custom-cake': 'Custom Cake',
            'seasonal': 'Seasonal Specials'
        };
        
        let message = `🎂 *NEW ORDER - THAMANI CAKES* 🎂\n\n`;
        message += `*Customer Details:*\n`;
        message += `👤 Name: ${data.customerName}\n`;
        message += `📱 Phone: ${data.customerPhone}\n\n`;
        
        message += `*Order Information:*\n`;
        message += `🍰 Type: ${orderTypeLabels[data.orderType] || data.orderType}\n`;
        message += `📝 Details: ${data.orderDetails}\n`;
        
        if (data.deliveryLocation) {
            message += `📍 Delivery: ${data.deliveryLocation}\n`;
        }
        
        message += `📅 Date: ${data.deliveryDate}\n\n`;
        
        message += `*Payment Options:*\n`;
        message += `💰 Cash on Delivery available\n\n`;
        
        message += `*Please confirm this order and provide total amount.*\n`;
        message += `Thank you! 🙏`;
        
        return message;
    }
    
    function showOrderConfirmation() {
        // Create confirmation modal
        const modal = document.createElement('div');
        modal.className = 'order-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>✅ Order Sent!</h3>
                <p>Your order has been sent to Thamani Cakes via WhatsApp.</p>
                <p>We'll confirm your order within 30 minutes.</p>
                <button class="btn-primary" onclick="this.closest('.order-confirmation-modal').remove()">OK</button>
            </div>
        `;
        
        // Add modal styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const modalStyles = document.createElement('style');
            modalStyles.id = 'modal-styles';
            modalStyles.textContent = `
                .order-confirmation-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3000;
                }
                
                .modal-content {
                    background: white;
                    padding: 32px;
                    border-radius: 16px;
                    text-align: center;
                    max-width: 400px;
                    margin: 20px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                }
                
                .modal-content h3 {
                    color: var(--moss-green);
                    margin-bottom: 16px;
                    font-size: 24px;
                }
                
                .modal-content p {
                    margin-bottom: 12px;
                    color: var(--charcoal);
                }
            `;
            document.head.appendChild(modalStyles);
        }
        
        document.body.appendChild(modal);
        
        // Reset form after successful submission
        orderForm.reset();
    }

    // Mobile menu toggle (if we add one later)
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.mobile-nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }

    // Intersection Observer for lazy loading and animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Handle lazy loading for images
                if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
                    entry.target.src = entry.target.dataset.src;
                    entry.target.removeAttribute('data-src');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.product-card, .step, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // WhatsApp button animation enhancement
    const whatsappBtn = document.querySelector('.sticky-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.transform = 'scale(1.15) rotate(5deg)';
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Gallery lightbox functionality (if we add gallery later)
    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.querySelector('.lightbox');
        
        if (galleryItems.length > 0 && lightbox) {
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const img = item.querySelector('img');
                    if (img) {
                        lightbox.querySelector('img').src = img.src;
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            lightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    // Form validation (if we add contact form later)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Handle form submission
                    console.log('Form is valid, submitting...');
                }
            });
        });
    }

    // Initialize all features
    initMobileMenu();
    initLightbox();
    initFormValidation();

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .product-card, .step, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu-toggle {
            display: none;
            background: var(--mustard);
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 8px;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
        }
        
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .form-error {
            border-color: #ff4444 !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Thamani Cakes JavaScript initialized successfully!');
});
