// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form functionality
    initContactForm();
    
    // Back to home button
    const backHomeBtn = document.querySelector('.back-home-btn-mini');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const successCloseBtn = document.getElementById('successCloseBtn');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('contactName');
        const email = formData.get('contactEmail');
        const subject = formData.get('contactSubject');
        const message = formData.get('contactMessage');
        const consent = formData.get('contactConsent');
        
        // Basic validation
        if (!name || !email || !subject || !message || !consent) {
            showNotification('Please fill in all required fields and accept the consent.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear form
            contactForm.reset();
            
            // Show success modal
            successModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
        }, 2000);
    });
    
    // Close success modal
    successCloseBtn.addEventListener('click', closeSuccessModal);
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    // Form validation feedback
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--error-color)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error-color);
        font-size: var(--font-size-xs);
        margin-top: var(--spacing-1);
        font-weight: 500;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'error' ? '#FF9AA5' : type === 'success' ? '#B5FFB8' : '#B5D8FF';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: var(--dark-purple);
        padding: var(--spacing-3) var(--spacing-4);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Escape key to close success modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
