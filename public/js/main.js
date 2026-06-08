// ShopVerse Pro — main.js

// ── Nav Toggle ──────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const [a,b,c] = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      a.style.transform = 'rotate(45deg) translate(5px,5px)';
      b.style.opacity   = '0';
      c.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      a.style.transform = b.style.opacity = c.style.transform = '';
    }
  });
}

// ── Flash auto-dismiss ──────────────────
document.querySelectorAll('.flash').forEach(f => {
  setTimeout(() => {
    f.style.transition = 'opacity .4s, max-height .4s, padding .4s';
    f.style.opacity = '0'; f.style.maxHeight = '0'; f.style.padding = '0';
    setTimeout(() => f.remove(), 400);
  }, 4000);
});

// ── Countdown Timer ─────────────────────
function startTimer() {
  const hEl = document.getElementById('t-h');
  const mEl = document.getElementById('t-m');
  const sEl = document.getElementById('t-s');
  if (!hEl) return;
  let total = 12*3600 + 45*60 + 30;
  setInterval(() => {
    if (total <= 0) return;
    total--;
    hEl.textContent = String(Math.floor(total/3600)).padStart(2,'0');
    mEl.textContent = String(Math.floor((total%3600)/60)).padStart(2,'0');
    sEl.textContent = String(total%60).padStart(2,'0');
  }, 1000);
}
startTimer();

// ── Scroll Reveal ───────────────────────
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 55);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.product-card, .stat-card, .cat-card').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .5s ease,transform .5s ease;';
    io.observe(el);
  });
}

// ── Wishlist toggle ─────────────────────
function toggleWish(btn) {
  const active = btn.classList.toggle('active');
  btn.textContent = active ? '❤️' : '🤍';
  showToast(active ? '❤️ Added to wishlist!' : 'Removed from wishlist');
}
function toggleWishPage(btn) {
  const active = btn.classList.toggle('active');
  btn.textContent = active ? '❤️' : '🤍';
  showToast(active ? '❤️ Added to wishlist!' : 'Removed from wishlist');
}

// ── Qty selector ────────────────────────
function changeQty(delta) {
  const input = document.getElementById('qty');
  if (!input) return;
  const val = parseInt(input.value) + delta;
  const max = parseInt(input.max) || 99;
  input.value = Math.max(1, Math.min(max, val));
}

// ── Toast notifications ─────────────────
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:2rem;right:2rem;background:${type==='success'?'#1e1e1a':'#dc2626'};color:#fff;padding:.875rem 1.5rem;border-radius:12px;font-size:.875rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:9999;animation:slideInToast .3s ease;`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
}
const toastStyle = document.createElement('style');
toastStyle.textContent = '@keyframes slideInToast{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}';
document.head.appendChild(toastStyle);

// ── Image preview in admin ───────────────
const imgUrlInput = document.getElementById('imageUrl');
const imgPreview  = document.getElementById('imgPreview');
const imgBox      = document.getElementById('imgPreviewBox');
if (imgUrlInput && imgPreview) {
  imgUrlInput.addEventListener('input', () => {
    const url = imgUrlInput.value.trim();
    if (url) {
      imgPreview.src = url;
      if (imgBox) imgBox.style.display = 'flex';
    }
  });
}

// ── Back to top ─────────────────────────
const btt = document.createElement('button');
btt.innerHTML = '↑';
btt.style.cssText = 'position:fixed;bottom:2rem;left:2rem;width:42px;height:42px;border-radius:50%;background:var(--black);color:#fff;font-size:1.1rem;font-weight:700;box-shadow:var(--shadow);opacity:0;transition:opacity .3s;z-index:999;display:flex;align-items:center;justify-content:center;';
btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(btt);
window.addEventListener('scroll', () => { btt.style.opacity = window.scrollY > 400 ? '1' : '0'; });

console.log('✅ ShopVerse Pro — JS loaded');
