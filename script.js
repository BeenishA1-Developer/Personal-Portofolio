document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links li a');

    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        navToggle.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); // Prevents scrolling when nav is open
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                navToggle.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .section-title');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('.main-header'); // Get header element
    const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found

    const highlightActiveNavLink = () => {
        let currentActiveSectionId = '';

        sections.forEach(section => {
            // Adjust for header height to make section active when it's just below the header
            const sectionTop = section.offsetTop - headerHeight - 1;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNavLink);
    window.addEventListener('resize', highlightActiveNavLink);
    highlightActiveNavLink(); // Call on load to set initial active link


    // --- Typing Effect for Hero Tagline ---
    const typingTextElement = document.querySelector('.typing-text');
    const words = [
        "a Junior Android Developer",
        "a Web Developer",
        "an FYP Specialist",
        "a Problem Solver"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 80;
    let delayBetweenWords = 1500;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, delayBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
            return;
        }

        const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, currentSpeed);
    }

    setTimeout(type, 2500);


    // --- Dark/Light Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    // Check for saved theme preference on page load
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to 'light'
    setTheme(savedTheme);

    // Event listener for the toggle button
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

});
