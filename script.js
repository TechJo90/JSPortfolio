
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = document.querySelector('.menu-icon');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    
    menuIcon.classList.toggle('active');
    const bars = document.querySelectorAll('.bar');
    
    if (menuIcon.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});


const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('active');
        
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 60, 
            behavior: 'smooth'
        });
    });
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
});

document.querySelectorAll('.project-card, .about-content, .contact-container').forEach(element => {
    observer.observe(element);
});


const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let valid = true;
        
        if (nameInput.value.trim() === '') {
            valid = false;
            showError(nameInput, 'Name is required');
        } else {
            removeError(nameInput);
        }
        
        if (emailInput.value.trim() === '') {
            valid = false;
            showError(emailInput, 'Email is required');
        } else if (!isValidEmail(emailInput.value)) {
            valid = false;
            showError(emailInput, 'Please enter a valid email');
        } else {
            removeError(emailInput);
        }
        
        if (messageInput.value.trim() === '') {
            valid = false;
            showError(messageInput, 'Message is required');
        } else {
            removeError(messageInput);
        }
        
        if (!valid) {
            e.preventDefault();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error-input');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error-input');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const style = document.createElement('style');
style.textContent = `
    .error-input {
