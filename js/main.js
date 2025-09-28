const navToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const observerOptions = {
  threshold: 0.25,
};

const fadeElements = document.querySelectorAll('.fade-in, .reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));
} else {
  fadeElements.forEach((el) => el.classList.add('visible'));
}

const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
  const lazyObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener('load', () => {
          img.classList.remove('lazy');
        });
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '100px 0px', threshold: 0.1 });

  lazyImages.forEach((img) => lazyObserver.observe(img));
}

const contactForm = document.querySelector('form[data-form="contact"]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
      alert('Merci ! Votre message a été envoyé.');
    }, 1200);
  });
}

const currentPath = window.location.pathname.split('/').pop();

if (navLinks) {
  navLinks.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    }
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const newsletterForm = document.querySelector('form[data-form="newsletter"]');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = newsletterForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Inscription en cours...';
    setTimeout(() => {
      newsletterForm.reset();
      button.disabled = false;
      button.textContent = 'Je m’inscris';
      alert('Merci ! Vous recevrez bientôt la lettre créative.');
    }, 1000);
  });
}

