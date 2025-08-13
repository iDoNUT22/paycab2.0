// Enhanced Loader functionality with Get Started button
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    const percentageText = document.querySelector('.loader-percentage');
    const getStartedBtn = document.getElementById('get-started-btn');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
    const bottomNav = document.querySelector('.bottom-nav');
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            // Show Get Started button
            setTimeout(() => {
                getStartedBtn.classList.add('show');
            }, 300);
        }
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;
    }, 100);
    // Handle Get Started button click
    getStartedBtn.addEventListener('click', function() {
        // Fade out loader
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Show main content
            mainContent.style.display = 'block';
            footer.style.display = 'block';
            bottomNav.style.display = 'flex';
            // Trigger animations
            mainContent.style.animation = 'fadeIn 0.6s ease-out';
            footer.style.animation = 'fadeIn 0.6s ease-out 0.2s both';
            bottomNav.style.animation = 'fadeIn 0.6s ease-out 0.4s both';
        }, 500);
    });
});

// Dark mode toggle with localStorage fallback
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
// Check for saved theme preference with error handling
let isDarkMode = false;
try {
    isDarkMode = localStorage.getItem('darkMode') === 'true';
} catch (e) {
    // Fallback to checking class on body
    isDarkMode = document.body.classList.contains('dark-mode');
}
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    // Update icon
    if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    // Save preference with error handling
    try {
        localStorage.setItem('darkMode', isDark);
    } catch (e) {
        // Silently fail if localStorage is not available
        console.warn('localStorage not available for theme preference');
    }
});

// Star Rating System
const stars = document.querySelectorAll('#rating i');
let ratingValue = 0;
stars.forEach(star => {
    star.addEventListener('click', function() {
        ratingValue = parseInt(this.getAttribute('data-value'));
        stars.forEach((s, index) => {
            if (index < ratingValue) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

// Feedback form submission
const submitBtn = document.getElementById('submit-feedback');
const modal = document.getElementById('screenshot-modal');
const cancelBtn = document.getElementById('cancel-btn');
const sendDiscordBtn = document.getElementById('send-discord');
const discordLink = document.getElementById('discord-link');
const discordModal = document.getElementById('discord-modal'); // Added reference
const closeDiscordModal = document.getElementById('close-discord-modal'); // Added reference
const joinDiscordBtn = document.getElementById('join-discord'); // Added reference
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const feedbackText = document.getElementById('feedback-text').value;
    if (feedbackText.trim() === '') {
        alert('Please enter your feedback before submitting');
        return;
    }
    if (ratingValue === 0) {
        alert('Please select a rating before submitting');
        return;
    }
    // Show modal
    modal.style.display = 'flex';
});
cancelBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});
sendDiscordBtn.addEventListener('click', function() {
    // In a real app, this would redirect to Discord
    alert('Redirecting to Discord...');
    modal.style.display = 'none';
    document.getElementById('feedback-text').value = '';
    // Reset rating
    stars.forEach(s => s.classList.remove('active'));
    ratingValue = 0;
});
// Discord modal functionality
discordLink.addEventListener('click', function(e) {
    e.preventDefault();
    discordModal.style.display = 'flex';
});
closeDiscordModal.addEventListener('click', function() {
    discordModal.style.display = 'none';
});

// Join Discord button functionality
joinDiscordBtn.addEventListener('click', function() {
    alert('Redirecting to Discord server...');
    window.open('https://discord.gg/PE3RbcUZah', '_blank'); // Replace with your Discord link
    discordModal.style.display = 'none';
});

// Payment Options Modals
const gcashOption = document.getElementById('gcash-option');
const mayaOption = document.getElementById('maya-option');
const paymentLetterOption = document.getElementById('payment-letter-option');
const priceListOption = document.getElementById('price-list-option');
const qrModal = document.getElementById('qr-modal');
const paymentLetterModal = document.getElementById('payment-letter-modal');
const priceListModal = document.getElementById('price-list-modal');
const qrTitle = document.getElementById('qr-title');
const qrCodeDisplay = document.getElementById('qr-code-display');
const downloadQrBtn = document.getElementById('download-qr');
const downloadLetterBtn = document.getElementById('download-letter');
const downloadPriceListBtn = document.getElementById('download-price-list');
const closeQrModal = document.getElementById('close-qr-modal');
const closeLetterModal = document.getElementById('close-letter-modal');
const closePriceListModal = document.getElementById('close-price-list-modal');
// GCash QR Modal
gcashOption.addEventListener('click', function() {
    qrTitle.textContent = 'Gcash QR Code';
    qrCodeDisplay.innerHTML = '<img src="img/gcash.jpg" alt="Gcash QR Code">';
    qrModal.style.display = 'flex';
});
// Maya QR Modal
mayaOption.addEventListener('click', function() {
    qrTitle.textContent = 'Maya QR Code';
    qrCodeDisplay.innerHTML = '<img src="img/maya.jpg" alt="Maya QR Code">';
    qrModal.style.display = 'flex';
});
// Payment Letter Modal
paymentLetterOption.addEventListener('click', function() {
    paymentLetterModal.style.display = 'flex';
});

// Price List Modal
priceListOption.addEventListener('click', function() {
    priceListModal.style.display = 'flex';
});
// Close modals
closeQrModal.addEventListener('click', function() {
    qrModal.style.display = 'none';
});
closeLetterModal.addEventListener('click', function() {
    paymentLetterModal.style.display = 'none';
});
closePriceListModal.addEventListener('click', function() {
    priceListModal.style.display = 'none';
});

downloadLetterBtn.addEventListener('click', function() {
    window.open('img/paymentletter.pdf', '_blank');
    paymentLetterModal.style.display = 'none';
});

// Download functions
downloadQrBtn.addEventListener('click', function() {
    alert('QR Code downloaded successfully!');
    qrModal.style.display = 'none';
});
downloadLetterBtn.addEventListener('click', function() {
    alert('Payment letter downloaded successfully!');
    paymentLetterModal.style.display = 'none';
});
downloadPriceListBtn.addEventListener('click', function() {
    alert('Price list downloaded successfully!');
    priceListModal.style.display = 'none';
});
// Mobile navigation active state
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        // Remove active class from all items
        navItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        // Scroll to section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Update active nav item on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});