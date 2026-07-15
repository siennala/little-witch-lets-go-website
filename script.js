// ===== Little Witch, Let's Go! — interactions =====

// Falling sparkles
function spawnSparkle() {
  const container = document.getElementById('sparkles');
  if (!container) return;
  const s = document.createElement('div');
  s.className = 'sparkle';
  const size = 4 + Math.random() * 6;
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.left = Math.random() * 100 + 'vw';
  s.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
  s.style.animationDuration = (6 + Math.random() * 6) + 's';
  container.appendChild(s);
  setTimeout(() => s.remove(), 13000);
}

setInterval(spawnSparkle, 700);
for (let i = 0; i < 6; i++) setTimeout(spawnSparkle, i * 300);

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.story-content, .char-card, .illustration-gallery img, .world-gallery img'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

// Tap-to-flip for touch devices (hover doesn't work well on mobile).
// First tap flips the card to preview the quote; second tap follows the link to the character page.
document.querySelectorAll('.char-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    if (window.matchMedia('(hover: none)').matches && !card.classList.contains('flipped')) {
      e.preventDefault();
      card.classList.add('flipped');
    }
  });
});