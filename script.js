const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const modal = document.getElementById('joinModal');
const joinBtn = document.getElementById('joinBtn');
const modalClose = document.getElementById('modalClose');
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

joinBtn.addEventListener('click', () => modal.classList.add('open'));
modalClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

joinForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(joinForm);
  const tag = data.get('tag');
  formMessage.textContent = `APPLICATION RECEIVED, ${tag.toUpperCase()}. THE VANGUARD WILL CONTACT YOU.`;
  joinForm.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    let current = 0;
    const duration = 1100;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      counter.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    countObserver.unobserve(counter);
  });
}, { threshold: 0.7 });

document.querySelectorAll('[data-count]').forEach(counter => countObserver.observe(counter));

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const contactForm=document.getElementById('contactForm');const contactMessage=document.getElementById('contactMessage');if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const name=new FormData(contactForm).get('name');contactMessage.textContent=`MESSAGE READY FOR ADMIN, ${name.toUpperCase()}.`;contactForm.reset()})}
