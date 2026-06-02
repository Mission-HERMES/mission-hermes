// ── NovaSpace — Scripts partagés ──

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    const dark = themeToggle.checked;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.querySelector('.theme-label').textContent = dark ? 'Mode sombre' : 'Mode clair';
  });
}

document.querySelectorAll('.btn-ghost.encourage').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const on = btn.dataset.on === '1';
    btn.dataset.on = on ? '' : '1';
    btn.style.color = on ? '' : '#f59e0b';
    btn.style.background = on ? '' : 'rgba(245,158,11,0.08)';
  });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('.tag-pill').forEach(pill => {
  pill.addEventListener('click', () => pill.classList.toggle('on'));
});
