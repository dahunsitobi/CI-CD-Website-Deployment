(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
  }

  /* ---------- reveal experience log entries on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealEls.forEach(el => {
      if (reduceMotion) {
        el.classList.add('is-visible');
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- count-up stats ---------- */
  const statEls = document.querySelectorAll('[data-count]');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;

    if (reduceMotion || target === 0) {
      el.textContent = target;
      return;
    }

    const duration = 1100;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && statEls.length) {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statEls.forEach(el => statObserver.observe(el));
  } else {
    statEls.forEach(el => { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- hero rotating tagline ---------- */
  const typeTarget = document.getElementById('typeTarget');
  const taglines = [
    "where failure isn't an option.",
    'built for audit and scrutiny.',
    'across 40+ countries.',
    'with zero major incidents.'
  ];

  if (typeTarget && !reduceMotion) {
    let phraseIndex = 0;
    let charIndex = taglines[0].length;
    let deleting = false;

    const tick = () => {
      const current = taglines[phraseIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = false;
          setTimeout(() => { deleting = true; tick(); }, 1800);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % taglines.length;
          charIndex = 0;
        }
      }

      typeTarget.textContent = current.slice(0, charIndex);
      setTimeout(tick, deleting ? 35 : 55);
    };

    setTimeout(tick, 2600);
  }

  /* ---------- contact form ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.querySelector('#cf-name').value.trim();
      const email = form.querySelector('#cf-email').value.trim();
      const message = form.querySelector('#cf-message').value.trim();

      if (!name || !email || !message) {
        formNote.style.color = 'var(--red)';
        formNote.textContent = 'Please fill in every field before sending.';
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:dahunsitobi@gmail.com?subject=${subject}&body=${body}`;

      formNote.style.color = 'var(--green)';
      formNote.textContent = 'Opening your email client to send this message…';
      form.reset();
    });
  }
})();
