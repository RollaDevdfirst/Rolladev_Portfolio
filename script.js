// =========================================
// MOBILE NAV
// =========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================
// WHATSAPP CONTACT
// All contact on this site routes through WhatsApp.
// Update WHATSAPP_NUMBER if this number ever changes.
// =========================================
const WHATSAPP_NUMBER = '2348111845134';

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// =========================================
// CONTACT FORM (contact.html only)
// Does not send anywhere itself. On submit, it builds a
// pre-filled message from what was typed and opens WhatsApp
// with that message ready to send.
// =========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = 'Please fill in all fields before continuing.';
      return;
    }

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const projectTypeSelect = contactForm.projectType;
    const projectType = projectTypeSelect.options[projectTypeSelect.selectedIndex].text;
    const message = contactForm.message.value.trim();

    const waMessage =
      `Hi, I'm ${name}.\n` +
      `Email: ${email}\n` +
      `What I need: ${projectType}\n\n` +
      `${message}`;

    formStatus.textContent = 'Opening WhatsApp...';
    window.open(buildWhatsAppLink(waMessage), '_blank', 'noopener');
    contactForm.reset();
    formStatus.textContent = '';
  });
}

// =========================================
// CURRENCY TOGGLE (index.html and services.html)
// Swaps price text between the ngn and usd data attributes.
// =========================================
const currencyToggle = document.getElementById('currencyToggle');

if (currencyToggle) {
  const currBtns = currencyToggle.querySelectorAll('.curr-btn');
  const priceEls = document.querySelectorAll('[data-ngn]');

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const currency = btn.dataset.currency;
      priceEls.forEach(el => {
        el.textContent = el.dataset[currency];
      });
    });
  });
}

// =========================================
// PROJECT FILTERS (work.html only)
// =========================================
const filterChips = document.querySelectorAll('#filters .chip');
const projectCards = document.querySelectorAll('#projectGrid .project-card-lg');

if (filterChips.length && projectCards.length) {
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// (skips entirely if the user prefers reduced motion,
// CSS also handles this as a fallback)
// =========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}