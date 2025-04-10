// scripts.js - General UI functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image gallery modal functionality
    const initGalleryModal = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.querySelector('.modal');
        const modalImg = document.querySelector('.modal-content');
        const closeModal = document.querySelector('.close-modal');

        if (!galleryItems.length || !modal || !modalImg || !closeModal) return;

        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.querySelector('img').src;
            });
        });

        closeModal.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));
    };

    // Side Menu Functionality
    const initSideMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const closeMenu = document.querySelector('.close-menu');
        const sideNav = document.querySelector('.side-nav');
        
        if (!menuToggle || !closeMenu || !sideNav) return;

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        // Toggle menu
        menuToggle.addEventListener('click', () => {
            sideNav.classList.add('open');
            overlay.classList.add('active');
        });

        // Close menu
        const closeMenuFn = () => {
            sideNav.classList.remove('open');
            overlay.classList.remove('active');
        };

        closeMenu.addEventListener('click', closeMenuFn);
        overlay.addEventListener('click', closeMenuFn);

        // Close when clicking a link
        document.querySelectorAll('.side-nav a').forEach(link => {
            link.addEventListener('click', closeMenuFn);
        });
    };

    // Tab switching
    const initAuthTabs = () => {
        const tabs = document.querySelectorAll('.auth-tab');
        const tabIndicator = document.querySelector('.tab-indicator');
        const authContainer = document.querySelector('.auth-container');

        if (!tabs.length || !tabIndicator || !authContainer) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                document.querySelector('.auth-tab.active')?.classList.remove('active');
                tab.classList.add('active');
                authContainer.setAttribute('data-active-tab', tab.dataset.tab);
                
                // Animate indicator
                const tabIndex = Array.from(tabs).indexOf(tab);
                tabIndicator.style.transform = `translateX(${tabIndex * 100}%)`;
                
                // Content transition animation
                authContainer.style.animation = 'none';
                setTimeout(() => {
                    authContainer.style.animation = 'slideUp 0.5s ease-out forwards';
                }, 10);
            });
        });
    };

    // View Transitions API
    const initViewTransitions = () => {
        if ('startViewTransition' in document) {
            document.addEventListener('click', (event) => {
                const anchor = event.target.closest('a');
                if (anchor && anchor.href && !anchor.target) {
                    event.preventDefault();
                    document.startViewTransition(() => {
                        window.location = anchor.href;
                    });
                }
            });
        }
    };

    // Initialize all components
    initGalleryModal();
    initSideMenu();
    initAuthTabs();
    initViewTransitions();
});

// auth.js - Authentication specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const handleSubmit = (form, submitBtn) => {
        submitBtn.classList.add('loading');
        submitBtn.textContent = '';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Success!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // Redirect after success
            setTimeout(() => {
                window.location.href = "member-dashboard.html";
            }, 1000);
        }, 1500);
    };

    // Initialize form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmit(loginForm, loginForm.querySelector('.form-submit'));
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmit(signupForm, signupForm.querySelector('.form-submit'));
        });
    }

    // Booking form handling
    document.querySelectorAll('.booking-form form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your booking request! We will contact you shortly to confirm.');
            form.reset();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Vertical menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const verticalMenu = document.querySelector('.side-nav');
    const overlay = document.querySelector('.overlay');
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
        verticalMenu.classList.add('expanded');
        overlay.classList.add('active');
    });
    
    // Close menu
    closeMenu.addEventListener('click', function() {
        verticalMenu.classList.remove('expanded');
        overlay.classList.remove('active');
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        verticalMenu.classList.remove('expanded');
        overlay.classList.remove('active');
    });
    
    // Close menu when clicking a link (for mobile)
    const navLinks = document.querySelectorAll('.side-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            verticalMenu.classList.remove('expanded');
            overlay.classList.remove('active');
        });
    });
    
    // Toggle menu when clicking the thin line (5px)
    verticalMenu.addEventListener('click', function(e) {
        if (e.clientX < 5) {
            this.classList.toggle('expanded');
            overlay.classList.toggle('active');
        }
    });

    // Rest of your existing JavaScript...
    // (Keep all your tab switching and form handling code)
});