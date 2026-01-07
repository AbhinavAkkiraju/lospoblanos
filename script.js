// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
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

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.service-card, .why-card, .testimonial-card, .gallery-item, .contact-card, .about-image, .about-text');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #06d6a0 0%, #1dd1a1 100%);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        font-size: 16px;
        animation: slideDown 0.5s ease;
    `;
    successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
        Thank you! We'll contact you soon.
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 4000);
    
    // Reset form
    contactForm.reset();
});

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Gallery image modal functionality (optional enhancement)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        `;
        
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #e63946;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.transform = 'scale(1.1) rotate(90deg)';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.transform = 'scale(1) rotate(0deg)';
        });
        
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Close modal on click
        modal.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000, isDecimal = false) => {
    let current = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    };
    updateCounter();
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const originalText = statNumber.textContent;
                const isDecimal = originalText.includes('.');
                const target = parseFloat(originalText.replace(/[^0-9.]/g, ''));
                const suffix = originalText.match(/\+/g) ? '+' : '';
                
                statNumber.textContent = '0';
                setTimeout(() => {
                    animateCounter(statNumber, target, 2000, isDecimal);
                    setTimeout(() => {
                        if (isDecimal) {
                            statNumber.textContent = target.toFixed(1) + suffix;
                        } else {
                            statNumber.textContent = target.toLocaleString() + suffix;
                        }
                    }, 2100);
                }, 200);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => statsObserver.observe(item));

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero && scrolled <= window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Los Poblanos Auto Repair website loaded successfully!');

// ===================================
// AI CHATBOT FUNCTIONALITY
// ===================================

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotBadge = document.querySelector('.chatbot-badge');

let conversationState = 'initial'; // Track conversation flow
let appointmentData = {};

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    chatbotToggle.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
        chatbotInput.focus();
        if (chatbotBadge) {
            chatbotBadge.style.display = 'none';
        }
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    chatbotToggle.classList.remove('active');
});

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    content.innerHTML = `
        <p>${text}</p>
        <div class="message-time">${timeString}</div>
    `;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    // Remove quick actions if they exist
    const quickActions = chatbotMessages.querySelector('.quick-actions');
    if (quickActions && isUser) {
        quickActions.remove();
    }
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingDiv;
}

// Remove typing indicator
function removeTyping(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
        typingDiv.parentNode.removeChild(typingDiv);
    }
}

// Bot responses database
const botResponses = {
    services: {
        response: "We offer a comprehensive range of auto repair services:\n\n• Oil Changes & Fluid Services\n• Brake Repairs & Maintenance\n• Engine Diagnostics\n• Battery & Electrical Services\n• Tire Services & Alignment\n• AC & Heating Repairs\n• Transmission Services\n• General Repairs\n\nWhich service are you interested in?",
        quickActions: true
    },
    appointment: {
        response: "I'd be happy to help you book an appointment!\n\nTo get started, please provide:\n\n1. Your name\n2. Phone number\n3. Type of service needed\n4. Preferred date\n\nYou can also call us directly at (425) 228-9220 for immediate assistance.",
        state: 'booking'
    },
    hours: {
        response: "Business Hours:\n\nMonday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed\n\nWe're currently " + (isOpenNow() ? "OPEN" : "CLOSED") + ".\n\nWould you like to schedule an appointment?",
        quickActions: false
    },
    pricing: {
        response: "Our pricing is competitive and transparent.\n\nWe provide FREE estimates for all services.\n\nPricing varies based on:\n• Vehicle make & model\n• Type of service required\n• Parts needed\n\nFor an accurate quote:\n• Call us at (425) 228-9220\n• Visit our shop in Renton\n• Tell me about your vehicle issue\n\nNo hidden fees - ever!",
        quickActions: false
    },
    location: {
        response: "Los Poblanos Auto Repair\nRenton, Washington\n\nWe're conveniently located in Renton and serve the entire Greater Seattle area.\n\nFeatures:\n• Easy parking available\n• Modern, clean facility\n\nWould you like directions or want to book an appointment?",
        quickActions: false
    },
    about: {
        response: "About Los Poblanos Auto Repair\n\nServing Renton for over 15 years.\n\nWhat We Offer:\n• ASE-Certified Technicians\n• State-of-the-Art Equipment\n• Honest, Fair Pricing\n• Quality Parts & Workmanship\n• Same-Day Service Available\n\nOur Track Record:\n• 4.5 Star Rating on Yelp\n• 5,000+ Happy Customers\n• 15,000+ Repairs Completed\n\nHow can we help you today?",
        quickActions: true
    }
};

// Check if business is open
function isOpenNow() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour + minute / 60;
    
    if (day === 0) return false; // Sunday
    if (day === 6) return time >= 9 && time < 16; // Saturday
    return time >= 8 && time < 18; // Monday-Friday
}

// Generate bot response
function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greeting patterns
    if (message.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
        return {
            response: "Hello! Welcome to Los Poblanos Auto Repair. How can I assist you today?",
            quickActions: true
        };
    }
    
    // Service inquiries
    if (message.match(/service|repair|fix|problem|issue|check/)) {
        return botResponses.services;
    }
    
    // Appointment booking
    if (message.match(/appointment|book|schedule|reserve|when can/)) {
        return botResponses.appointment;
    }
    
    // Hours inquiry
    if (message.match(/hour|open|close|when|time|available/)) {
        return botResponses.hours;
    }
    
    // Pricing inquiry
    if (message.match(/price|cost|how much|estimate|quote|charge|fee|expensive|cheap/)) {
        return botResponses.pricing;
    }
    
    // Location inquiry
    if (message.match(/location|address|where|direction|map|find/)) {
        return botResponses.location;
    }
    
    // About company
    if (message.match(/about|who are|history|experience|certified|rating|review/)) {
        return botResponses.about;
    }
    
    // Oil change specific
    if (message.match(/oil change|oil|fluid/)) {
        return {
            response: "Oil Change Services\n\nWe offer both conventional and synthetic oil changes at competitive prices.\n\nWhat's Included:\n• Multi-point inspection\n• Top-quality oil & filters\n• Quick 30-45 minute service\n• All makes & models\n\nWould you like to schedule an appointment?",
            quickActions: false
        };
    }
    
    // Brake specific
    if (message.match(/brake|braking|stop|squeaking|grinding/)) {
        return {
            response: "Brake Services\n\nBrake issues? We can help!\n\nOur Services:\n• Free brake inspection\n• Pad & rotor replacement\n• Brake fluid exchange\n• ABS diagnostics\n\nDon't wait - your safety is important.\n\nWould you like to book an inspection today?",
            quickActions: false
        };
    }
    
    // Engine/check engine light
    if (message.match(/engine|check engine|light|diagnostic|performance/)) {
        return {
            response: "Engine Diagnostics\n\nCheck engine light on?\n\nWe use advanced diagnostic equipment to:\n• Read error codes\n• Identify root cause\n• Provide honest repair options\n• Clear codes after repair\n\nFREE diagnostic with repair!\n\nCall (425) 228-9220 or book an appointment.",
            quickActions: false
        };
    }
    
    // Emergency/urgent
    if (message.match(/emergency|urgent|now|asap|immediate|today|help/)) {
        return {
            response: "Need Urgent Help?\n\nPlease call us immediately:\n(425) 228-9220\n\nWe'll do our best to accommodate emergency repairs and same-day service when possible.\n\nSafety First:\nIf you're experiencing a breakdown, please ensure your vehicle is in a safe location.",
            quickActions: false
        };
    }
    
    // Phone number request
    if (message.match(/phone|number|call|contact/)) {
        return {
            response: "Contact Information\n\nPhone: (425) 228-9220\n\nBusiness Hours:\nMonday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed\n\nYou can also continue chatting with me for instant answers!",
            quickActions: false
        };
    }
    
    // Thank you
    if (message.match(/thank|thanks|appreciate/)) {
        return {
            response: "You're very welcome! We're here to help anytime. Is there anything else you'd like to know about our services?",
            quickActions: true
        };
    }
    
    // Default response
    return {
        response: "I'd be happy to help! I can assist you with:\n\n• Learning about our services\n• Booking appointments\n• Checking business hours\n• Getting pricing information\n• Answering questions about repairs\n\nWhat would you like to know?",
        quickActions: true
    };
}

// Add quick action buttons
function addQuickActions() {
    const existingActions = chatbotMessages.querySelector('.quick-actions');
    if (existingActions) return;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'quick-actions';
    actionsDiv.innerHTML = `
        <button class="quick-action-btn" data-action="services">
            <i class="fas fa-tools"></i>
            Our Services
        </button>
        <button class="quick-action-btn" data-action="appointment">
            <i class="fas fa-calendar"></i>
            Book Appointment
        </button>
        <button class="quick-action-btn" data-action="hours">
            <i class="fas fa-clock"></i>
            Business Hours
        </button>
        <button class="quick-action-btn" data-action="pricing">
            <i class="fas fa-dollar-sign"></i>
            Pricing Info
        </button>
    `;
    
    chatbotMessages.appendChild(actionsDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Add event listeners to new quick action buttons
    actionsDiv.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', handleQuickAction);
    });
}

// Handle quick action buttons
function handleQuickAction(e) {
    const action = e.currentTarget.dataset.action;
    const buttonText = e.currentTarget.textContent.trim();
    
    addMessage(buttonText, true);
    
    const typing = showTyping();
    setTimeout(() => {
        removeTyping(typing);
        const response = botResponses[action];
        if (response) {
            addMessage(response.response);
            if (response.quickActions) {
                addQuickActions();
            }
        }
    }, 1000);
}

// Initial quick actions setup
document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', handleQuickAction);
});

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Show typing indicator
    const typing = showTyping();
    
    // Generate and show response after delay
    setTimeout(() => {
        removeTyping(typing);
        const response = generateResponse(message);
        addMessage(response.response);
        
        if (response.quickActions) {
            addQuickActions();
        }
    }, 1000 + Math.random() * 1000);
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Show initial notification
setTimeout(() => {
    if (chatbotBadge) {
        chatbotBadge.style.display = 'flex';
    }
}, 3000);
