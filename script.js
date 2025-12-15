document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loading...');
    
    // Initialize variables
    let dayMode = false;
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const closeEasterEgg = document.querySelector('.close-easter-egg');
    const easterEggNotification = document.getElementById('easter-egg-notification');
    
    // Initialize animations
    function initializeAnimations() {
        console.log('Initializing animations...');
        
        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe section elements
        sections.forEach(section => {
            if (section.id !== 'home') { // Don't animate home section
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.5s, transform 0.5s';
                observer.observe(section);
            }
        });
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            dayMode = !dayMode;
            if (dayMode) {
                document.body.classList.add('day-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> DAY MODE';
                console.log('Switched to day mode');
            } else {
                document.body.classList.remove('day-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> NIGHT MODE';
                console.log('Switched to night mode');
            }
        });
    }
    
    // Mobile menu toggle
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i> CLOSE' : 
                '<i class="fas fa-bars"></i> MENU';
            console.log('Mobile menu toggled');
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i> MENU';
            });
        });
    }
    
    // Smooth scrolling navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection) return;
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            console.log(`Navigated to ${targetId}`);
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Expand/Collapse functionality for Experience and Certification sections
    function setupExpandButtons() {
        const expandButtons = document.querySelectorAll('.expand-btn');
        
        expandButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    if (targetElement.style.display === 'none' || targetElement.style.display === '') {
                        // Expand
                        targetElement.style.display = 'block';
                        this.textContent = '−';
                        this.classList.add('expanded');
                    } else {
                        // Collapse
                        targetElement.style.display = 'none';
                        this.textContent = '+';
                        this.classList.remove('expanded');
                    }
                }
            });
        });
    }
    
    // Initialize expand buttons
    setupExpandButtons();
    
    // Konami Code Easter Egg
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerEasterEgg();
        }
    });
    
    function triggerEasterEgg() {
        if (easterEggNotification) {
            easterEggNotification.classList.add('show');
            
            // Fun animation
            document.body.style.animation = 'rainbowFlash 2s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
            
            // Reset Konami code
            konamiCode = [];
            
            console.log('🎉 Easter egg activated!');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                easterEggNotification.classList.remove('show');
            }, 5000);
        }
    }
    
    // Close easter egg notification
    if (closeEasterEgg && easterEggNotification) {
        closeEasterEgg.addEventListener('click', () => {
            easterEggNotification.classList.remove('show');
        });
    }
    
    // Add CSS for rainbow flash animation
    if (!document.querySelector('#rainbowFlashStyle')) {
        const style = document.createElement('style');
        style.id = 'rainbowFlashStyle';
        style.textContent = `
            @keyframes rainbowFlash {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize on load
    setTimeout(initializeAnimations, 500);
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log('Window resized, adjusting layout...');
            setupExpandButtons(); // Reinitialize expand buttons for responsive layout
        }, 250);
    });
    
    // Add touch support for mobile
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Debug info
    console.log('Portfolio initialization complete');
    console.log('Features loaded:');
    console.log('- Logo-centered landing page');
    console.log('- Smooth scrolling navigation');
    console.log('- Mobile responsive design');
    console.log('- Day/Night theme toggle');
    console.log('- Collapsible experience and certification details');
    console.log('- Rectangular containers for experience section');
    console.log('- Section-specific backgrounds');
    console.log('- Konami code easter egg');
});