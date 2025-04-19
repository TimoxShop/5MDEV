document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hide default cursor on specific elements
    const links = document.querySelectorAll('a, button, .gallery-item, .menu-toggle, .swiper-button-next, .swiper-button-prev');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderWidth = '2px';
            cursor.style.opacity = '0.5';
        });
        link.addEventListener('mouseleave', function() {
            cursorFollower.style.width = '32px';
            cursorFollower.style.height = '32px';
            cursorFollower.style.borderWidth = '1px';
            cursor.style.opacity = '1';
        });
    });
    
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(6, 6, 10, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(12, 12, 17, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Active nav item on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Initialize Swiper
    const factionSlider = new Swiper('.faction-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
    });

    // Initialize Other Products Swiper
    const otherProductsSlider = new Swiper('.other-products-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    // Gallery image modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-src');
            const caption = this.getAttribute('data-caption');
            
            const modal = document.createElement('div');
            modal.classList.add('gallery-modal');
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${caption}">
                    <p>${caption}</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Animate modal appearance
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });
    });
    
    // Animation on scroll with GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Reveal animations for elements
        const revealElements = document.querySelectorAll('.reveal');
        
        revealElements.forEach((element, index) => {
            gsap.fromTo(element, 
                { y: 50, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    delay: index * 0.1 % 0.5 // Stagger effect within groups
                }
            );
        });
        
        // Animate hero section
        gsap.fromTo(".hero h1", 
            { opacity: 0, y: -50 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.3 }
        );
        
        gsap.fromTo(".hero p", 
            { opacity: 0 }, 
            { opacity: 1, duration: 1, delay: 0.6 }
        );
        
        gsap.fromTo(".hero .btn", 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.9 }
        );
        
        // Parallax effect for background images
        gsap.to(".join-us", {
            backgroundPosition: "50% 30%",
            ease: "none",
            scrollTrigger: {
                trigger: ".join-us",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    } else {
        // Fallback for when GSAP is not available
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = function() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.85) {
                    element.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on page load
    }
    
    // Disable hover effects when scrolling for performance
    let timer;
    window.addEventListener('scroll', function() {
        if (!document.body.classList.contains('disable-hover')) {
            document.body.classList.add('disable-hover');
        }
        
        clearTimeout(timer);
        timer = setTimeout(function() {
            document.body.classList.remove('disable-hover');
        }, 150);
    }, false);
});