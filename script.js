document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Scroll Animation Observer
    const faders = document.querySelectorAll('.feature-card, .course-card, .special-text, .contact-card, .table-responsive, .pricing-notes');
    
    // Add fade-in class initially
    faders.forEach(fader => {
        fader.classList.add('fade-in');
    });

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Pricing Tabs function (Global)
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    
    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    
    // Remove active class from all tab buttons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // Show current tab and add active class to button
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// WhatsApp Join Form Submission
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('studentName').value;
        const studentClass = document.getElementById('studentClass').value;
        const phone = document.getElementById('phoneNumber').value;
        const message = document.getElementById('message').value;
        
        // Format the message
        const whatsappMessage = `*New Admission Enquiry* 🎓\n\n*Name:* ${name}\n*Class:* ${studentClass}\n*Phone:* ${phone}\n*Address/Message:* ${message}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Director's WhatsApp number
        const whatsappNumber = '918102154421';
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open in new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        joinForm.reset();
    });
}
