// Updated Help Center JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item-updated');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question-updated');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items (accordion behavior)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // Contact Us Button functionality
    const contactBtn = document.querySelector('.contact-us-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'contact.html';
        });
    }

    // Back to home button functionality
    const backHomeBtn = document.querySelector('.back-home-btn-mini');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});
