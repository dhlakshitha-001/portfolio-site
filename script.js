/* ============================================================
   SCRIPT.JS — D H Lakshitha Portfolio
   Features: Loader · Navbar · Scroll reveal · Skill bars ·
             Active nav highlight · Mobile menu · Form validation
   ============================================================ */

/* ─── 1. LOADING SCREEN ─────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader once page is ready (min 800ms for effect)
  const minDuration = new Promise(res => setTimeout(res, 800));
  const pageReady = new Promise(res => {
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
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const navLinkEls = document.querySelectorAll('.nav-link');

// Helper: close the mobile drawer
function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

// Scroll: add .scrolled class after 60px
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Mobile: toggle open class on hamburger + links panel + overlay
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  if (navOverlay) navOverlay.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close when a nav link is clicked
navLinkEls.forEach(link => link.addEventListener('click', closeMenu));

// Close on overlay click
if (navOverlay) navOverlay.addEventListener('click', closeMenu);

// Close on outside click (keyboard / pointer)
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !navToggle.contains(e.target)) {
    closeMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
});


/* ─── 3. ACTIVE NAV HIGHLIGHT ON SCROLL ─────────────────────── */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollPos = window.scrollY + 120; // offset for sticky nav

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}


/* ─── 3.5. GLOBAL CURSOR AURA & TECH CARD SPOTLIGHT ───────────── */
const cursorAura = document.getElementById('cursor-aura');
const techCards = document.querySelectorAll('.tech-card, .project-card, .cert-card, .stat');

document.addEventListener('mousemove', (e) => {
  if (cursorAura) {
    cursorAura.style.left = e.clientX + 'px';
    cursorAura.style.top = e.clientY + 'px';
  }
  techCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* ─── HERO PARALLAX & GLOW TRACKING ──────────────────────── */
const heroSection = document.getElementById('hero');
if (heroSection) {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    targetX = (e.clientX - rect.left - centerX) * 0.45;
    targetY = (e.clientY - rect.top - centerY) * 0.45;
  });

  function animateHeroGlow() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    heroSection.style.setProperty('--mouse-x', `${currentX}px`);
    heroSection.style.setProperty('--mouse-y', `${currentY}px`);
    requestAnimationFrame(animateHeroGlow);
  }
  animateHeroGlow();
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
      const width = target.dataset.width || '0';
      // Small delay so reveal animation finishes first
      setTimeout(() => {
        target.style.width = width + '%';
      }, 300);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ─── FEEDBACK SYSTEM ───────────────────────────────────────── */
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');
const ratingStars = document.querySelectorAll('#ratingInput i');
const fbRatingVal = document.getElementById('fbRatingVal');

if (ratingStars.length > 0) {
  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-val'));
      if (fbRatingVal) fbRatingVal.value = val;
      ratingStars.forEach(s => {
        if (parseInt(s.getAttribute('data-val')) <= val) s.classList.add('active');
        else s.classList.remove('active');
      });
    });
  });
}

const STORAGE_KEY = 'portfolio_feedback';
function loadFeedback() {
  if (!feedbackList) return;
  const stored = localStorage.getItem(STORAGE_KEY);
  let feedbacks = [];
  if (stored) {
    feedbacks = JSON.parse(stored);
  } else {
    feedbacks = [
      { name: "Sarah J. @ TechStart", rating: 5, message: "Working with Lakshitha was a breeze. Highly professional and delivered ahead of schedule." },
      { name: "Mike T. @ InnoWeb", rating: 5, message: "The UI/UX skills are out of this world. Our new dashboard is fast, responsive, and beautifully crafted." }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
  }

    feedbackList.innerHTML = feedbacks.map(fb => `
      <div class="feedback-card tech-card reveal">
        <div class="stars">
          ${Array.from({ length: 5 }).map((_, i) => `<i class="ri-star-fill" style="color: ${i < fb.rating ? '#fbbf24' : '#4b5563'}"></i>`).join('')}
        </div>
        <p>"${fb.message}"</p>
        <div class="feedback-author">
          <div class="avatar">${fb.name.charAt(0).toUpperCase()}</div>
          <div class="info">
            <strong>${fb.name.split('@')[0].trim()}</strong>
            ${fb.name.includes('@') ? `<span>@ ${fb.name.split('@')[1].trim()}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Setup spotlight for new cards
    const newCards = document.querySelectorAll('.feedback-card.tech-card');
    document.addEventListener('mousemove', (e) => {
      newCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
}
loadFeedback();

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fbName').value.trim();
    const message = document.getElementById('fbMessage').value.trim();
    const rating = parseInt(fbRatingVal ? fbRatingVal.value : 5);

    if (!name || !message) {
      alert("Please fill out both Name and Message.");
      return;
    }

    const feedbacks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    feedbacks.unshift({ name, rating, message });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));

    const fbSuccess = document.getElementById('fbSuccess');
    if (fbSuccess) fbSuccess.classList.add('show');
    feedbackForm.reset();

    if (fbRatingVal) fbRatingVal.value = 5;
    ratingStars.forEach(s => s.classList.add('active'));

    loadFeedback();

    setTimeout(() => {
      if (fbSuccess) fbSuccess.classList.remove('show');
    }, 4000);
  });
}

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
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();

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

    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite"></i> Sending…';

    const formData = new FormData(contactForm);
    
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
      .then(async (response) => {
        if (response.status == 200) {
          contactForm.reset();
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong. Please try again.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="ri-send-plane-line"></i>';
      });
  });

  // Live clear errors
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
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


/* ─── 7. SUBSCRIPTION FORM ─────────────────────────────────── */
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = subscribeForm.querySelector('button');
    btn.innerHTML = '<i class="ri-check-line"></i>';
    subscribeForm.querySelector('input').value = '';
    setTimeout(() => btn.innerHTML = '<i class="ri-arrow-right-line"></i>', 3000);
  });
}

/* ─── 8. SPIN KEYFRAME (injected for loader icon) ───────────── */
(function injectSpinStyle() {
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }';
  document.head.appendChild(style);
})();

/* ─── 9. MAIN SCROLL HANDLER (throttled) ───────────────────── */
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
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ─── 10. ABOUT CANVAS — particle network ───────────────────── */
(function initAboutCanvas() {
  const canvas = document.getElementById('aboutCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], raf;
  const COUNT = 55;
  const MAX_DIST = 110;
  const BLUE = '59,130,246';

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2 + 1.2,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: COUNT }, makeNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${BLUE},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Dots
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${BLUE},0.65)`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  // Only run when section is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { init(); draw(); }
      else { cancelAnimationFrame(raf); }
    });
  }, { threshold: 0.1 });

  observer.observe(canvas.closest('#about'));
  window.addEventListener('resize', () => { resize(); });
})();

/* ─── 11. REVEAL-RIGHT OBSERVER ─────────────────────────────── */
const revealRightEls = document.querySelectorAll('.reveal-right');
const revealRightObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children]
        .filter(el => el.classList.contains('reveal-right'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.12}s`;
      entry.target.classList.add('visible');
      revealRightObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealRightEls.forEach(el => revealRightObs.observe(el));