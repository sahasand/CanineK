/**
 * Enhanced JavaScript for Canine Kingdom Co Website
 * Provides smooth animations, scroll effects, and interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeFloatingPaws();
    initializeParallax();
});

/**
 * Initialize scroll-triggered animations for text boxes
 */
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all text boxes for animation
    document.querySelectorAll('.text-box').forEach(box => {
        observer.observe(box);
    });

    // Animate hero text on load
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }
    }, 300);
}

/**
 * Enhanced navigation with scroll effects and scroll spy
 */
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    let lastScrollY = window.scrollY;

    // Add scrolled class when scrolling
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation based on scroll position
        updateActiveNavigation();

        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update hash without scrolling
                setTimeout(() => {
                    history.pushState(null, null, targetId);
                }, 500);
            }
        });
    });

    // Scroll spy functionality
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const currentLink = document.querySelector(`.navbar a[href="#${section.id}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }

    // Initialize active state based on current hash or default to home
    const currentHash = window.location.hash || '#home';
    const initialLink = document.querySelector(`.navbar a[href="${currentHash}"]`);
    if (initialLink) {
        initialLink.classList.add('active');
    } else {
        // Default to home if no hash
        const homeLink = document.querySelector('.navbar a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        const target = document.querySelector(hash);
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });

    // Initial call to set correct active state
    setTimeout(updateActiveNavigation, 100);
}

/**
 * Create floating paw print animation system (wow factor)
 */
function initializeFloatingPaws() {
    const pawContainer = document.createElement('div');
    pawContainer.className = 'floating-paws';
    pawContainer.innerHTML = `
        <style>
        .floating-paws {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
            overflow: hidden;
        }
        
        .paw-print {
            position: absolute;
            font-size: 20px;
            color: rgba(255, 107, 53, 0.3);
            animation: floatPaw 15s linear infinite;
            user-select: none;
        }
        
        @keyframes floatPaw {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .heart-float {
            color: rgba(255, 107, 53, 0.4);
            animation: floatHeart 12s linear infinite;
        }
        
        @keyframes floatHeart {
            0% {
                transform: translateY(100vh) scale(0.5);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: translateY(90vh) scale(1);
            }
            90% {
                opacity: 1;
                transform: translateY(10vh) scale(0.8);
            }
            100% {
                transform: translateY(-50px) scale(0.3);
                opacity: 0;
            }
        }
        </style>
    `;
    
    document.body.appendChild(pawContainer);

    // Create floating elements periodically
    setInterval(() => {
        createFloatingElement();
    }, 3000);

    // Create initial batch
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingElement(), i * 1000);
    }
}

/**
 * Create individual floating paw print or heart
 */
function createFloatingElement() {
    const container = document.querySelector('.floating-paws');
    if (!container) return;

    const element = document.createElement('div');
    const symbols = ['🐾', '❤️', '🐕', '🦴'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    element.innerHTML = randomSymbol;
    element.className = randomSymbol === '❤️' ? 'heart-float' : 'paw-print';
    
    // Random horizontal position
    element.style.left = Math.random() * 100 + '%';
    
    // Random animation delay
    element.style.animationDelay = Math.random() * 2 + 's';
    
    // Random size variation
    const scale = 0.8 + Math.random() * 0.4;
    element.style.transform = `scale(${scale})`;
    
    container.appendChild(element);
    
    // Remove element after animation completes
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 17000);
}

/**
 * Enhanced parallax scrolling effect
 */
function initializeParallax() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .full-screen-image');

        parallaxElements.forEach((element) => {
            const speed = 0.5;
            const elementTop = element.offsetTop;
            const distance = scrolled - elementTop;
            let yPos = -(distance * speed);
            const maxOffset = 0;
            const minOffset = -element.offsetHeight;
            yPos = Math.min(Math.max(yPos, minOffset), maxOffset);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Only enable parallax on devices that can handle it well
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', requestParallaxUpdate);
    }
}

/**
 * Button enhancement with ripple effect
 */
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 600ms linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation style
if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Performance optimization for mobile devices
 */
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Disable parallax on mobile for better performance
        document.querySelectorAll('.hero-image, .full-screen-image, #contact, #services').forEach(element => {
            element.style.backgroundAttachment = 'scroll';
        });
        
        // Reduce floating elements frequency on mobile
        const pawContainer = document.querySelector('.floating-paws');
        if (pawContainer) {
            pawContainer.style.display = 'none';
        }
        
        // Adjust section heights for mobile
        document.querySelectorAll('.section').forEach(section => {
            section.style.minHeight = '100vh';
        });
    } else {
        // Re-enable parallax on desktop
        document.querySelectorAll('.hero-image, .full-screen-image, #contact, #services').forEach(element => {
            element.style.backgroundAttachment = 'fixed';
        });
        
        // Show floating elements on desktop
        const pawContainer = document.querySelector('.floating-paws');
        if (pawContainer) {
            pawContainer.style.display = 'block';
        }
    }
}

// Initialize mobile optimizations
optimizeForMobile();
window.addEventListener('resize', optimizeForMobile);