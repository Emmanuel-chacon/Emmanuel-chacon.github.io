document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Welcome Screen (Terminal Style) Logic ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-btn');
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (welcomeScreen && enterBtn) {
        if (hasVisited) {
            // If the user has already visited in this session, hide the terminal immediately
            welcomeScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            // First visit: run the animation
            document.body.style.overflow = 'hidden';
        
            setTimeout(() => {
                enterBtn.classList.add('show-enter');
            }, 4500);
        
            enterBtn.addEventListener('click', () => {
                welcomeScreen.classList.add('welcome-hidden');
                document.body.style.overflow = 'auto';
                // Set the flag so we remember the user visited
                sessionStorage.setItem('hasVisited', 'true');
            });
        }
    }
    // --- 1. Mobile Hamburger Menu Logic ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav_links');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('nav-active');
        });

        // Closes the mobile menu when a link is clicked
        const navItems = document.querySelectorAll('.nav_links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navList.classList.remove('nav-active');
            });
        });
    }

    // --- 2. Scroll Spy for Active Navigation Links ---
    const navLinks = document.querySelectorAll('.nav_links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjustment to detect the active section with the fixed navigation bar
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // --- 3. Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Reveals cards and sections smoothly
                entry.target.classList.add('show');
                
                // Animates the progress bars
                if (entry.target.classList.contains('progress-line')) {
                    const targetWidth = entry.target.getAttribute('data-width');
                    entry.target.style.width = targetWidth;
                }

                // Animates the horizontal timeline line (Path)
                if (entry.target.id === 'path') {
                    const ul = entry.target.querySelector('ul');
                    if (ul) ul.style.setProperty('--path-width', '100%');
                }
            }
        });
    }, { 
        threshold: 0.2 
    });

    const hiddenElements = document.querySelectorAll('.structure, .progress-line, #path');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 4. Navbar Background Color Change on Scroll ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 80) {
            nav.style.backgroundColor = "rgba(15, 23, 42, 0.95)"; 
            nav.style.transition = "0.5s ease";
        } else {
            nav.style.backgroundColor = "#0F172A";
        }
    });

    // --- 5. Back to Top Button Logic ---
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Shows the button after scrolling down 300 pixels
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show-btn");
            } else {
                backToTopBtn.classList.remove("show-btn");
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});;