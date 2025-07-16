// Custom Cursor
const cursor = document.querySelector('.cursor');
const trails = [];
const trailCount = 5; // Reduced number of trails for better performance

// Create cursor trails
for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    trails.push(trail);
}

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smoothly update cursor position
    cursorX += (mouseX - cursorX) * 0.9; // Faster movement
    cursorY += (mouseY - cursorY) * 0.9;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Update trails with a delay effect
    trails.forEach((trail, index) => {
        const delay = index * 0.05; // Reduced delay for faster trail responsiveness
        trail.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${1 - delay})`;
        trail.style.opacity = `${1 - delay}`;
    });

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// Floating Particles
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
}
createParticles();

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Enhanced Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animations for skill cards
            if (entry.target.classList.contains('skills-grid')) {
                const skillCards = entry.target.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }
            
            // Stagger animations for project cards
            if (entry.target.classList.contains('projects-grid')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Magnetic effect for floating elements
const floatingElements = document.querySelectorAll('.floating-element');
document.addEventListener('mousemove', (e) => {
    floatingElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            const moveX = deltaX * force * 0.3;
            const moveY = deltaY * force * 0.3;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
        } else {
            element.style.transform = 'translate(0, 0) scale(1)';
        }
    });
});

// Enhanced form submission with animation
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            this.reset();
        }, 2000);
    }, 1000);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic gradient animation speed based on scroll
window.addEventListener('scroll', () => {
    const scrollSpeed = window.pageYOffset / window.innerHeight;
    document.documentElement.style.setProperty('--gradient-speed', Math.max(0.5, 3 - scrollSpeed * 2) + 's');
});

// Initialize all animations on load
window.addEventListener('load', () => {
    // Trigger initial animations
    document.body.style.opacity = '1';
    
    // Add some randomness to particle animations
    document.querySelectorAll('.particle').forEach(particle => {
        particle.style.animationDelay = Math.random() * 20 + 's';
    });
});

// Light/Dark Mode Toggle with Sun/Moon Icon
const toggleButton = document.createElement('div');
toggleButton.className = 'toggle-mode';
toggleButton.innerHTML = '🌙'; // Default to moon icon
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '20px';
toggleButton.style.right = '20px';
toggleButton.style.width = '40px';
toggleButton.style.height = '40px';
toggleButton.style.borderRadius = '50%';
toggleButton.style.background = 'rgba(0, 0, 0, 0.8)';
toggleButton.style.color = 'white';
toggleButton.style.display = 'flex';
toggleButton.style.alignItems = 'center';
toggleButton.style.justifyContent = 'center';
toggleButton.style.zIndex = '1000';
toggleButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggleButton.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙'; // Switch icon
});


function toggleNavbarVisibility() {
    const bottomNavbar = document.querySelector('.bottom-navbar');
    const toggleNavbarButton = document.getElementById('toggleNavbar');

    if (bottomNavbar.classList.contains('minimized')) {
        bottomNavbar.classList.remove('minimized');
        toggleNavbarButton.textContent = '⬅'; // Arrow pointing right
    } else {
        bottomNavbar.classList.add('minimized');
        toggleNavbarButton.textContent = '➡'; // Arrow pointing left
    }
}

document.getElementById('toggleNavbar').addEventListener('click', toggleNavbarVisibility());
