// ============================================
//   ELECTIQ — MAIN JS
//   Ballot Rain Animation + Nav + Chat Toggle
// ============================================

// ---- BALLOT RAIN CANVAS ----
const canvas = document.getElementById('ballotCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const SYMBOLS = ['🗳️', '✅', '☑️', '🏛️', '📋', '🗺️', '⚖️', '🌐'];
  const CHARS = ['VOTE', 'ELECT', '✓', '◉', '▣', '☐'];

  const particles = [];
  const NUM_PARTICLES = 60;

  class BallotParticle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -40;
      this.size = Math.random() * 14 + 8;
      this.speed = Math.random() * 0.8 + 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      this.drift = (Math.random() - 0.5) * 0.5;
      this.text = Math.random() > 0.5
        ? CHARS[Math.floor(Math.random() * CHARS.length)]
        : '□';
      this.isBox = Math.random() > 0.7;
    }

    update() {
      this.y += this.speed;
      this.x += this.drift;
      this.rotation += this.rotSpeed;
      if (this.y > canvas.height + 50) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.isBox) {
        // Draw ballot box shape
        ctx.strokeStyle = '#c9a84c';
        ctx.lineWidth = 1.5;
        const s = this.size;
        ctx.strokeRect(-s/2, -s/2, s, s);
        if (Math.random() > 0.5) {
          ctx.strokeStyle = '#f0c040';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-s/4, 0);
          ctx.lineTo(0, s/4);
          ctx.lineTo(s/3, -s/4);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#c9a84c';
        ctx.font = `${this.size}px Space Mono, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(this.text, 0, 0);
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new BallotParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ---- CHAT TOGGLE ----
function toggleChat() {
  const panel = document.getElementById('chatPanel');
  const overlay = document.getElementById('chatOverlay');
  if (!panel) return;
  panel.classList.toggle('open');
  overlay.classList.toggle('active');
  document.body.style.overflow = panel.classList.contains('open') ? 'hidden' : '';
}

// ---- MOBILE NAV ----
function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '70px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = 'var(--navy-mid)';
  links.style.padding = '1.5rem 2rem';
  links.style.borderBottom = '1px solid var(--border)';
}

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(10, 22, 40, 0.98)';
    nav.style.padding = '0.75rem 2.5rem';
  } else {
    nav.style.background = 'rgba(10, 22, 40, 0.85)';
    nav.style.padding = '1rem 2.5rem';
  }
});

// ---- INTERSECTION OBSERVER: Card Animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease both';
      entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.dataset.delay = i * 0.1;
  card.style.opacity = '0';
  observer.observe(card);
});