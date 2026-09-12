/* ==========================================================================
   PORTFOLIO DE NOËL N’KOUE - JAVASCRIPT LOGIC & INTERACTION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const savedTheme = localStorage.getItem('theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
      } else {
        themeIcon.className = 'fas fa-sun';
      }
    }
  }

  // Initialize theme
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // ------------------------------------------------------------------------
  // 2. HEADER SCROLL & MOBILE MENU DRAWER
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. ACCORDION TOGGLE LOGIC (FOR SKILLS & SERVICES CARDS)
  // ------------------------------------------------------------------------
  const accordionCards = document.querySelectorAll('.accordion-card');

  accordionCards.forEach(card => {
    const headerEl = card.querySelector('.accordion-header');
    if (!headerEl) return;

    headerEl.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      if (isOpen) {
        card.classList.remove('open');
      } else {
        card.classList.add('open');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. CONTACT FORM HANDLER & DIRECT WHATSAPP / EMAIL REDIRECT
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !message) {
        alert('Veuillez remplir au moins votre nom et votre message.');
        return;
      }

      // Display success status feedback
      if (formStatus) {
        formStatus.textContent = '✔ Votre message a été préparé.';
        formStatus.className = 'form-status success';
      }

      // Format WhatsApp message text
      const waText = encodeURIComponent(
        `Bonjour Noël N’KOUE,\n\nJe suis ${name}.\n` +
        (email ? `Email: ${email}\n` : '') +
        (phone ? `Téléphone: ${phone}\n` : '') +
        (service ? `Service souhaité: ${service}\n` : '') +
        `\nMessage:\n${message}`
      );

      // Open WhatsApp direct chat
      window.open(`https://wa.me/2290161551958?text=${waText}`, '_blank');

      // Reset form fields
      contactForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 5. SCROLL ACTIVE LINK HIGHLIGHTING
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
