// Terms of Service JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize terms functionality
    initTermsOfService();
    
    // Back to home button
    const backHomeBtn = document.querySelector('.back-home-btn-mini');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});

function initTermsOfService() {
    // Add scroll-to-section functionality
    addSectionNavigation();
    
    // Add reading progress indicator
    createReadingProgressIndicator();
    
    // Add print functionality
    addPrintButton();
    
    // Add section highlighting
    addSectionHighlighting();
}

function addSectionNavigation() {
    // Create floating table of contents
    const tocButton = document.createElement('div');
    tocButton.className = 'toc-button';
    tocButton.innerHTML = '<i class="fas fa-list"></i>';
    tocButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        transition: var(--transition-fast);
    `;
    
    tocButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--dark-purple)';
        this.style.transform = 'scale(1.1)';
    });
    
    tocButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-color)';
        this.style.transform = 'scale(1)';
    });
    
    tocButton.addEventListener('click', function() {
        const sections = document.querySelectorAll('.terms-section-title');
        const tocMenu = document.createElement('div');
        tocMenu.className = 'toc-menu';
        tocMenu.style.cssText = `
            position: fixed;
            bottom: 140px;
            right: 20px;
            background: var(--white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--gray-200);
            min-width: 200px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1001;
            padding: var(--spacing-2);
        `;
        
        sections.forEach((section, index) => {
            const menuItem = document.createElement('div');
            menuItem.style.cssText = `
                padding: var(--spacing-2);
                cursor: pointer;
                border-radius: var(--radius-md);
                transition: var(--transition-fast);
                font-size: var(--font-size-xs);
                color: var(--dark-purple);
            `;
            menuItem.textContent = section.textContent;
            
            menuItem.addEventListener('mouseenter', function() {
                this.style.background = 'var(--pastel-lavender)';
            });
            
            menuItem.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
            });
            
            menuItem.addEventListener('click', function() {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                document.body.removeChild(tocMenu);
            });
            
            tocMenu.appendChild(menuItem);
        });
        
        document.body.appendChild(tocMenu);
        
        // Remove menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!tocMenu.contains(e.target) && !tocButton.contains(e.target)) {
                    if (document.body.contains(tocMenu)) {
                        document.body.removeChild(tocMenu);
                    }
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    });
    
    document.body.appendChild(tocButton);
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
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Terms';
    printButton.className = 'print-terms-btn';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
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

function addSectionHighlighting() {
    const sections = document.querySelectorAll('.terms-section');
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
}

// Add mobile responsiveness for floating buttons
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .toc-button {
            bottom: 60px !important;
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
        }
        
        .print-terms-btn {
            bottom: 10px !important;
            left: 10px !important;
            padding: var(--spacing-1) var(--spacing-2) !important;
            font-size: var(--font-size-xs) !important;
        }
        
        .toc-menu {
            bottom: 110px !important;
            right: 10px !important;
            min-width: 150px !important;
        }
    }
`;
document.head.appendChild(style);
