/* ============================================================
   SCRIPT.JS — Alex Morgan Portfolio
   Features: Loader · Navbar · Scroll reveal · Skill bars ·
             Active nav highlight · Mobile menu · Form validation
   ============================================================ */

/* ─── 1. LOADING SCREEN ─────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader once page is ready (min 800ms for effect)
  const minDuration = new Promise(res => setTimeout(res, 800));
  const pageReady   = new Promise(res => {
    if (document.readyState === 'complete') res();
    else window.addEventListener('load', res, { once: true });
  });

  Promise.all([minDuration, pageReady]).then(() => {
    loader.classList.add('hidden');
    // Trigger initial reveals after loader hides
    setTimeout(runReveal, 100);
  });
})();


/* ─── 2. NAVBAR — scroll + mobile toggle ────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

// Scroll: add .scrolled class after 60px
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Mobile: toggle open class on hamburger + links panel
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  // Prevent body scroll when menu is open
  document.body.style.overflow =
    navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a nav link is clicked
navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* ─── 3. ACTIVE NAV HIGHLIGHT ON SCROLL ─────────────────────── */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollPos = window.scrollY + 120; // offset for sticky nav

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}


/* ─── 4. SCROLL REVEAL (IntersectionObserver) ───────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.children]
        .filter(el => el.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.07}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

function runReveal() {
  revealEls.forEach(el => revealObserver.observe(el));
}
// Also run now in case loader already resolved
runReveal();


/* ─── 5. SKILL BAR ANIMATION ────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width  = target.dataset.width || '0';
      // Small delay so reveal animation finishes first
      setTimeout(() => {
        target.style.width = width + '%';
      }, 300);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ─── 6. CONTACT FORM VALIDATION ────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Helper: show / clear errors
    function setError(inputId, errorId, msg) {
      const input = document.getElementById(inputId);
      const error = document.getElementById(errorId);
      if (msg) {
        input.classList.add('error');
        error.textContent = msg;
        valid = false;
      } else {
        input.classList.remove('error');
        error.textContent = '';
      }
    }

    // Validate Name
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg   = document.getElementById('message').value.trim();

    setError('name', 'nameError',
      !name ? 'Please enter your name.' :
      name.length < 2 ? 'Name must be at least 2 characters.' : '');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError('email', 'emailError',
      !email ? 'Please enter your email.' :
      !emailRegex.test(email) ? 'Please enter a valid email address.' : '');

    setError('message', 'messageError',
      !msg ? 'Please enter your message.' :
      msg.length < 10 ? 'Message must be at least 10 characters.' : '');

    if (!valid) return;

    // Simulate form submission (no backend)
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite"></i> Sending…';

    setTimeout(() => {
      // Reset
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="ri-send-plane-line"></i>';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1400);
  });

  // Live clear errors
  ['name','email','message'].forEach(id => {
    const el    = document.getElementById(id);
    const errId = id + 'Error';
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const err = document.getElementById(errId);
        if (err) err.textContent = '';
      });
    }
  });
}


/* ─── 7. SPIN KEYFRAME (injected for loader icon) ───────────── */
(function injectSpinStyle() {
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }';
  document.head.appendChild(style);
})();


/* ─── 8. MAIN SCROLL HANDLER (throttled) ───────────────────── */
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleNavbarScroll();
      highlightNav();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Run once on init
handleNavbarScroll();
highlightNav();


/* ─── 9. SMOOTH ANCHOR LINKS (for browsers without native support) */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});