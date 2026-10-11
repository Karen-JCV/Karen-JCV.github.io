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
