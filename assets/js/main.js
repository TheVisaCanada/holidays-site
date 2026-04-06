/**
 * HOLIDAYS BY BAARIK - LUXURY TRAVEL PLATFORM
 * Main JavaScript - GSAP Animations & Interactions
 * TICO-Registered | IATA-Certified
 */

// ============================================
// 1. INITIALIZATION & DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavigation();
  initScrollProgress();
  initRevealAnimations();
  initCustomCursor();
  initMagneticButtons();
  initSmoothScroll();
  initCounters();
  initFormValidation();
  initMobileMenu();
  initParallax();
  initVideoHero();
});

// ============================================
// 2. LOADING SCREEN
// ============================================

function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingBar = document.querySelector('.loading-bar-inner');

  if (!loadingScreen) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        const nav = document.querySelector('.nav'); if (nav) { nav.classList.remove('nav-scrolled'); }
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 800);
        document.body.classList.add('loaded');
        setTimeout(() => { initHeroAnimations(); }, 300);
      }, 200);
    }
    if (loadingBar) {
      loadingBar.style.width = `${progress}%`;
    }
  }, 100);
}

// ============================================
// 3. NAVIGATION
// ============================================

function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const hero = document.querySelector('.section-hero');

  function updateNav() {
    const heroBottom = hero ? hero.offsetHeight : window.innerHeight;
    if (window.scrollY >= heroBottom) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('load', updateNav);
  requestAnimationFrame(() => { setTimeout(updateNav, 100); });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// 4. SCROLL PROGRESS
// ============================================

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

// ============================================
// 5. REVEAL ANIMATIONS (GSAP + Intersection Observer)
// ============================================

function initRevealAnimations() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    // Fallback to CSS animations
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(el => observer.observe(el));
    return;
  }
  
  // GSAP-powered animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Fade up reveals
  gsap.utils.toArray('.reveal').forEach((elem, i) => {
    gsap.fromTo(elem, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: elem.classList.contains('stagger-1') ? 0.1 :
               elem.classList.contains('stagger-2') ? 0.2 :
               elem.classList.contains('stagger-3') ? 0.3 :
               elem.classList.contains('stagger-4') ? 0.4 :
               elem.classList.contains('stagger-5') ? 0.5 : 0
      }
    );
  });
  
  // Left reveals
  gsap.utils.toArray('.reveal-left').forEach((elem) => {
    gsap.fromTo(elem,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Right reveals
  gsap.utils.toArray('.reveal-right').forEach((elem) => {
    gsap.fromTo(elem,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Scale reveals
  gsap.utils.toArray('.reveal-scale').forEach((elem) => {
    gsap.fromTo(elem,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ============================================
// 6. HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;
  
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCtas = document.querySelector('.hero-cta-group');
  const heroVideo = document.querySelector('.video-bg');
  
  const tl = gsap.timeline();
  
  // Video fade in
  if (heroVideo) {
    tl.fromTo(heroVideo, 
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    );
  }
  
  // Title animation with split text effect
  if (heroTitle) {
    tl.fromTo(heroTitle,
      { opacity: 0, y: 80, rotateX: -30 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power3.out' },
      '-=1'
    );
  }
  
  // Subtitle fade in
  if (heroSubtitle) {
    tl.fromTo(heroSubtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }
  
  // CTAs stagger in
  if (heroCtas) {
    tl.fromTo(heroCtas.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    );
  }
}

// ============================================
// 7. CUSTOM CURSOR
// ============================================

function initCustomCursor() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  const cursor = document.querySelector('.custom-cursor');
  const cursorText = document.querySelector('.custom-cursor-text');
  
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor follow
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    if (cursorText) {
      cursorText.style.left = `${cursorX}px`;
      cursorText.style.top = `${cursorY}px`;
    }
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .card, .btn-magnetic');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  // Custom cursor text on specific elements
  const discoverElements = document.querySelectorAll('[data-cursor-text]');
  
  discoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorText) {
        cursorText.textContent = el.dataset.cursorText;
        cursorText.classList.add('visible');
      }
    });
    
    el.addEventListener('mouseleave', () => {
      if (cursorText) {
        cursorText.classList.remove('visible');
      }
    });
  });
}

// ============================================
// 8. MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  const magneticElements = document.querySelectorAll('.btn-magnetic');
  
  magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'translate(0, 0)';
    });
  });
}

// ============================================
// 9. SMOOTH SCROLL (Lenis)
// ============================================

function initSmoothScroll() {
  // Check if Lenis is available
  if (typeof Lenis === 'undefined') return;
  
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
  
  // Connect Lenis to GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
    
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  }
}

// ============================================
// 10. COUNTERS
// ============================================

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.counter);
        const suffix = counter.dataset.suffix || '';
        const duration = parseInt(counter.dataset.duration) || 2000;
        
        animateCounter(counter, target, suffix, duration);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, suffix, duration) {
  const startTime = performance.now();
  const startValue = 0;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(startValue + (target - startValue) * easeProgress);
    
    element.textContent = current.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================
// 11. FORM VALIDATION
// ============================================

function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      
      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('form-error');
      });
      form.querySelectorAll('.error-message').forEach(el => el.remove());
      
      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showFieldError(field, 'This field is required');
        }
      });
      
      // Validate email
      form.querySelectorAll('input[type="email"]').forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid email address');
        }
      });
      
      // Validate phone
      form.querySelectorAll('input[type="tel"]').forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid phone number');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
}

function showFieldError(field, message) {
  field.classList.add('form-error');
  
  const error = document.createElement('span');
  error.className = 'error-message';
  error.textContent = message;
  
  field.parentNode.appendChild(error);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
}

// ============================================
// 12. MOBILE MENU
// ============================================

function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu-link');
  
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// ============================================
// 13. PARALLAX EFFECTS
// ============================================

function initParallax() {
  if (typeof gsap === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Parallax for background images
  gsap.utils.toArray('.parallax-bg').forEach((elem) => {
    gsap.to(elem, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: elem.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  // Parallax for floating elements
  gsap.utils.toArray('.parallax-float').forEach((elem) => {
    gsap.to(elem, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: elem,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}

// ============================================
// 14. UTILITY FUNCTIONS
// ============================================

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// ============================================
// 15. WHATSAPP INTEGRATION
// ============================================

function initWhatsAppButton() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (!whatsappBtn) return;
  
  whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = whatsappBtn.dataset.phone || '+16472497545';
    const message = encodeURIComponent(whatsappBtn.dataset.message || 'Hello, I would like to inquire about your luxury travel services.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  });
}

// Initialize WhatsApp
initWhatsAppButton();

// ============================================
// 16. HORIZONTAL SCROLL (For Fleet Gallery)
// ============================================

function initHorizontalScroll() {
  if (typeof gsap === 'undefined') return;
  
  const container = document.querySelector('.horizontal-scroll-container');
  if (!container) return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  const scrollWidth = container.scrollWidth - window.innerWidth;
  
  gsap.to(container, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container.parentElement,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}

// Initialize horizontal scroll if element exists
document.addEventListener('DOMContentLoaded', initHorizontalScroll);

// ============================================
// 17. MASONRY GRID (For Weddings/Journal)
// ============================================

function initMasonry() {
  const grids = document.querySelectorAll('.masonry-grid');
  
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.masonry-item');
    let columnHeights = [0, 0, 0];
    
    items.forEach((item, index) => {
      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);
      
      item.style.position = 'absolute';
      item.style.left = `${(columnIndex * 100) / 3}%`;
      item.style.top = `${minHeight}px`;
      item.style.width = `${100 / 3}%`;
      
      columnHeights[columnIndex] += item.offsetHeight + 20;
    });
    
    grid.style.height = `${Math.max(...columnHeights)}px`;
  });
}

// Initialize masonry on load and resize
window.addEventListener('load', initMasonry);
window.addEventListener('resize', debounce(initMasonry, 250));

// ============================================
// 18. TILT EFFECT (For Cards)
// ============================================

function initTiltEffect() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  const tiltElements = document.querySelectorAll('.tilt-card');
  
  tiltElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', initTiltEffect);

// ============================================
// 19. VIDEO BACKGROUND CONTROLS
// ============================================

function initVideoBackground() {
  const videos = document.querySelectorAll('.video-bg');
  
  videos.forEach(video => {
    // Pause video when not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(video);
    
    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        video.pause();
      } else if (observer.takeRecords().some(e => e.isIntersecting)) {
        video.play();
      }
    });
  });
}

// Initialize video controls
document.addEventListener('DOMContentLoaded', initVideoBackground);

// ============================================
// 20. COMING SOON MODAL
// ============================================

function showComingSoon() {
  const modal = document.createElement('div');
  modal.className = 'coming-soon-modal';
  modal.innerHTML = `
    <div class="coming-soon-content">
      <h3>Coming Soon</h3>
      <p>This feature will be available shortly.</p>
      <button class="btn btn-primary" onclick="this.closest('.coming-soon-modal').remove()">Close</button>
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 22, 39, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
    animation: fadeIn 0.3s ease;
  `;
  
  modal.querySelector('.coming-soon-content').style.cssText = `
    background: var(--midnight-ocean);
    padding: 3rem;
    border-radius: 8px;
    border: 1px solid rgba(241, 196, 15, 0.3);
    text-align: center;
    max-width: 400px;
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Add coming soon to placeholder links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-coming-soon]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showComingSoon();
    });
  });
});

// ============================================
// 21. VIDEO HERO CROSSFADE
// ============================================

function initVideoHero() {
  const vids = Array.from(document.querySelectorAll('.hero-vid'));
  const dots = Array.from(document.querySelectorAll('.vid-dot'));
  if (!vids.length) return;

  const slides = [
    {
      title: 'The Art of<br>the Escape',
      subtitle: 'Premium holidays for families and travellers who value quality. Every detail handled — so you can just enjoy the journey.'
    },
    {
      title: 'Where the Shore<br>Meets Stillness',
      subtitle: 'Sun-drenched coastlines, private villas, and world-class resorts. Your perfect beach escape, curated to the last detail.'
    },
    {
      title: 'Your Day,<br>Perfectly Placed',
      subtitle: 'Destination weddings designed around you. From intimate ceremonies to grand celebrations — we orchestrate every moment.'
    }
  ];

  const titleEl = document.querySelector('.hero-title');
  const subtitleEl = document.querySelector('.hero-subtitle');
  let current = 0;

  function swapText(index) {
    if (!titleEl || !subtitleEl) return;
    titleEl.classList.add('hero-text-transitioning');
    subtitleEl.classList.add('hero-text-transitioning');
    setTimeout(() => {
      titleEl.innerHTML = slides[index].title;
      subtitleEl.textContent = slides[index].subtitle;
      titleEl.classList.remove('hero-text-transitioning');
      subtitleEl.classList.remove('hero-text-transitioning');
    }, 400);
  }

  function goTo(index) {
    vids[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = index;
    const targetVid = vids[current];
    // Lazy-load video src on first switch to that slide
    if (targetVid.dataset.src && !targetVid.src) {
      targetVid.src = targetVid.dataset.src;
      targetVid.load();
    }
    targetVid.classList.add('active');
    dots[current] && dots[current].classList.add('active');
    targetVid.currentTime = 0;
    targetVid.play().catch(() => {});
    swapText(current);
  }

  vids.forEach((vid, i) => {
    vid.addEventListener('ended', () => {
      goTo((i + 1) % vids.length);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  vids[0].play().catch(() => {});
}

// ============================================
// 22. CONSOLE BRANDING
// ============================================

console.log('%c🏝️ Holidays by Baarik', 'font-size: 24px; font-weight: bold; color: #F1C40F;');
console.log('%cLuxury Travel for the Discerning Few', 'font-size: 14px; color: #FDFFFC;');
console.log('%cTICO-Registered | IATA-Certified | Mississauga, Ontario', 'font-size: 12px; color: #00D2FF;');
console.log('%c© 2026 Baarik Travel & Tours Inc. All rights reserved.', 'font-size: 10px; color: rgba(253, 255, 252, 0.5);');
