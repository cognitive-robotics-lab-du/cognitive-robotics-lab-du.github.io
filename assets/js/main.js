/**
 * main.js
 *
 * Core JavaScript functionality for Cognitive Robotics Lab website
 * Handles theme toggle, mobile menu, custom cursor, and interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENT REFERENCES ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navWrapper = document.getElementById('nav-wrapper');
    const signatureLogo = document.getElementById('signature-logo');
    const heroSection = document.querySelector('.hero-bg');
    const togglingTitle = document.getElementById('toggling-title');
    const currentTimeEl = document.getElementById('current-time');
    const currentYearEl = document.getElementById('current-year');
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    // --- TIME & YEAR DISPLAY ---
    function updateTime() {
        if (currentTimeEl) {
            currentTimeEl.textContent = new Date().toLocaleString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                timeZoneName: 'short' 
            });
        }
    }

    function initializeTime() {
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }
        updateTime();
        setInterval(updateTime, 1000);
    }

    // --- TOGGLING TITLE ANIMATION ---
    function initializeTogglingTitle() {
        if (!togglingTitle) return;
        
        const titles = [
            "Artificial Intelligence", 
            "Deep Learning", 
            "Computer Vision", 
            "Healthcare AI",
            "Robotics",
            "Machine Learning"
        ];
        let titleIndex = 0;
        
        togglingTitle.style.transition = 'opacity 0.3s ease-in-out';
        
        setInterval(() => {
            titleIndex = (titleIndex + 1) % titles.length;
            togglingTitle.style.opacity = '0';
            
            setTimeout(() => {
                togglingTitle.textContent = titles[titleIndex];
                togglingTitle.style.opacity = '1';
            }, 300);
        }, 3000);
    }

    // --- THEME TOGGLE FUNCTIONALITY ---
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const iconHtml = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
            
        if (themeToggle) themeToggle.innerHTML = iconHtml;
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    function initializeTheme() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    // --- MOBILE MENU FUNCTIONALITY ---
    function initializeMobileMenu() {
        if (!mobileMenuButton || !mobileMenu) return;
        
        const mobileMenuIcon = mobileMenuButton.querySelector('i');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenuIcon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
        });
        
        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuIcon.className = 'fas fa-bars';
            });
        });
    }

    // --- NAVIGATION VISIBILITY ON SCROLL ---
    function handleNavVisibility() {
        if (!heroSection) return;
        
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const isHeroVisible = heroBottom > 0;
        const shouldBeVisible = isHeroVisible || window.scrollY < 200;
        
        const opacityValue = shouldBeVisible ? '1' : '0';
        const pointerEventsValue = shouldBeVisible ? 'auto' : 'none';
        
        // Apply styles to nav, logo, and theme toggle
        [navWrapper, signatureLogo, themeToggle].forEach(el => {
            if (el) {
                el.style.opacity = opacityValue;
                el.style.pointerEvents = pointerEventsValue;
            }
        });
    }

    function initializeScrollEffects() {
        window.addEventListener('scroll', handleNavVisibility);
        handleNavVisibility(); // Initial check
    }

    // --- CUSTOM CURSOR FUNCTIONALITY ---
    function initializeCustomCursor() {
        if (!cursorDot || !cursorOutline) return;
        
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseover', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = '#ffffff';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
            });
            
            el.addEventListener('mouseout', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = '#ffffff';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // --- SMOOTH SCROLLING FOR ANCHOR LINKS ---
    function initializeSmoothScrolling() {
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
    }

    // --- INITIALIZE ALL FUNCTIONALITY ---
    function initialize() {
        initializeTime();
        initializeTogglingTitle();
        initializeTheme();
        initializeMobileMenu();
        initializeScrollEffects();
        initializeCustomCursor();
        initializeSmoothScrolling();
        
        console.log('🚀 Cognitive Robotics Lab initialized successfully');
    }

    // Start the application
    initialize();

    // --- UTILITY FUNCTIONS ---
    window.CRL = {
        // Expose useful functions for debugging or extensions
        setTheme,
        updateTime,
        toggleTheme
    };

});