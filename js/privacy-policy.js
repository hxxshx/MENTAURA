// Privacy Policy JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize privacy policy functionality
    initPrivacyPolicy();
    
    // Back to home button
    const backHomeBtn = document.querySelector('.back-home-btn-mini');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});

function initPrivacyPolicy() {
    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add highlight effect to sections when scrolled to
    const sections = document.querySelectorAll('.privacy-section');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1.01)';
                entry.target.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add reading progress indicator
    createReadingProgressIndicator();
    
    // Print functionality
    addPrintButton();
}

function createReadingProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    });
}

function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    printButton.className = 'print-policy-btn';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: var(--radius-lg);
        cursor: pointer;
        font-size: var(--font-size-sm);
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: var(--transition-fast);
        display: flex;
        align-items: center;
        gap: var(--spacing-1);
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--dark-purple)';
        this.style.transform = 'translateY(-2px)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .reading-progress {
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @media (max-width: 768px) {
        .print-policy-btn {
            bottom: 10px !important;
            right: 10px !important;
            padding: var(--spacing-1) var(--spacing-2) !important;
            font-size: var(--font-size-xs) !important;
        }
    }
`;
document.head.appendChild(style);
