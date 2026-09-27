// ---------- 主题切换（浅色/深色 + localStorage 记忆） ----------
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme){
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

// 初始化：优先读取用户上一次的选择，否则跟随系统深浅色
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') applyTheme(saved);
  else if (matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
})();

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ---------- 顶部导航滚动状态 + 滚动进度条 + Hero 视差 + 导航高亮 + 返回顶部 ----------
const topbar = document.getElementById('topbar');
const progress = document.getElementById('progress');
const heroWrap = document.querySelector('.hero .wrap');
const navLinks = document.querySelectorAll('nav a');
const sections = [...document.querySelectorAll('section[id]')];
const toTop = document.getElementById('toTop');
let ticking = false;
function onScroll(){
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? y / max * 100 : 0) + '%';
  topbar.classList.toggle('scrolled', y > 10);
  toTop.classList.toggle('show', y > 600);
  if (y < innerHeight && heroWrap) heroWrap.style.transform = `translateY(${y * .18}px)`; //视差
  let cur = '';
  sections.forEach(s => { if (y >= s.offsetTop - 140) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  ticking = false;
}
addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, {passive:true});

// ---------- 点击涟漪动画（按钮与卡片） ----------
document.querySelectorAll('.btn, .card').forEach(el => {
  el.addEventListener('click', e => {
    if (el.getAttribute('href') === '#') e.preventDefault(); //占位链接不跳顶
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const s = document.createElement('span');
    s.className = 'ripple';
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d/2}px;top:${e.clientY - r.top - d/2}px`;
    el.appendChild(s);
    setTimeout(() => s.remove(), 800);
  });
});

// ---------- 返回顶部 ----------
toTop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

// ---------- 数字滚动动画 ----------
const cio = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count, dur = 1400, t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); //easeOutCubic
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    cio.unobserve(el);
  });
}, {threshold:.5});
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

// ---------- 滚动浮现动画 ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- 年份 ----------
document.getElementById('year').textContent = new Date().getFullYear();
