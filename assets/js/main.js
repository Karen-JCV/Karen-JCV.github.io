/**
 * Karen Camacho Verastegui - Portfolio JavaScript
 * Interactive functionality: scroll effects, filter tabs, clipboard copy, mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Blur Effect on Scroll ---
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Navigation Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
      });
    });
  }

  // --- 3. Scroll Spy (Highlight Active Section) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- 4. Project Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          const categories = card.getAttribute('data-category') || '';
          if (categories.includes(filterValue)) {
            card.style.display = 'grid';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // --- 5. Copy Email to Clipboard with Toast Notification ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notice');

  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'karenverastegui22@outlook.com';

      navigator.clipboard.writeText(email).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      }).catch(err => {
        console.error('Error al copiar correo: ', err);
      });
    });
  }

  // --- 7. CV Download Modal (language picker) ---
  const cvTrigger = document.getElementById('cv-download-btn');
  const cvModal = document.getElementById('cv-modal');

  if (cvTrigger && cvModal) {
    const cvDialog = cvModal.querySelector('.cv-modal__dialog');
    const cvClose = cvModal.querySelector('.cv-modal__close');
    const cvOptions = cvModal.querySelectorAll('.cv-option');
    const toastLabel = toast ? toast.querySelector('span') : null;
    const toastDefault = toastLabel ? toastLabel.textContent : '';
    let lastFocused = null;

    const openCvModal = (e) => {
      e.preventDefault();
      lastFocused = document.activeElement;
      cvModal.hidden = false;
      void cvModal.offsetWidth; // reflow so the fade-in transition runs
      cvModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (cvOptions.length) setTimeout(() => cvOptions[0].focus(), 50);
    };

    const closeCvModal = () => {
      cvModal.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
      setTimeout(() => {
        if (!cvModal.classList.contains('is-open')) cvModal.hidden = true;
      }, 300);
    };

    cvTrigger.addEventListener('click', openCvModal);
    cvClose.addEventListener('click', closeCvModal);

    // Close when clicking the dimmed backdrop
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCvModal();
    });

    // Keyboard: Esc closes, Tab stays inside the dialog
    document.addEventListener('keydown', (e) => {
      if (!cvModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeCvModal();
        return;
      }
      if (e.key === 'Tab') {
        const items = cvDialog.querySelectorAll('a[href], button:not([disabled])');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Choosing a language starts the download (native <a download>) and confirms with the toast
    cvOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        setTimeout(closeCvModal, 150);
        if (toast && toastLabel) {
          toastLabel.textContent = opt.getAttribute('data-toast') || toastDefault;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => { toastLabel.textContent = toastDefault; }, 400);
          }, 3200);
        }
      });
    });
  }

  // --- 6. Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
