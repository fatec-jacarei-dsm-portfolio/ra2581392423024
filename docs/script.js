// ── NAV: Shrink on scroll + mobile menu ──
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing after reveal
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── SKILL BARS: Animate when section enters view ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        // The width is already set inline; trigger transition by forcing reflow
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = targetWidth;
          });
        });
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const habilidadesSection = document.getElementById('habilidades');
if (habilidadesSection) {
  skillObserver.observe(habilidadesSection);
}

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = '';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--ink)';
      }
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => {
  activeObserver.observe(section);
});

// ── SMOOTH SCROLL for older browsers ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── HERO PHOTO → CARDS TRANSITION ──
const heroPhoto = document.getElementById('heroPhoto');
const heroCards = document.getElementById('heroCards');

if (heroPhoto && heroCards) {

  // Cria os dots de progresso
  const progressWrap = document.createElement('div');
  progressWrap.className = 'hero-progress';
  progressWrap.innerHTML = `
    <div class="hero-progress-dot active" id="dot0"></div>
    <div class="hero-progress-dot" id="dot1"></div>
  `;
  heroPhoto.parentElement.appendChild(progressWrap);

  function showCards() {
    heroPhoto.classList.add('hide');
    heroCards.classList.add('show');
    document.getElementById('dot0').classList.remove('active');
    document.getElementById('dot1').classList.add('active');
  }

  function showPhoto() {
    heroPhoto.classList.remove('hide');
    heroCards.classList.remove('show');
    document.getElementById('dot1').classList.remove('active');
    document.getElementById('dot0').classList.add('active');
  }

  // Alterna automaticamente a cada 3.5 segundos
  let showingPhoto = true;
  const interval = setInterval(() => {
    if (showingPhoto) {
      showCards();
    } else {
      showPhoto();
    }
    showingPhoto = !showingPhoto;
  }, 3500);

  // Clique nos dots para trocar manualmente
  document.getElementById('dot0').addEventListener('click', () => {
    showPhoto();
    showingPhoto = true;
    clearInterval(interval);
  });

  document.getElementById('dot1').addEventListener('click', () => {
    showCards();
    showingPhoto = false;
    clearInterval(interval);
  });
}