// Scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to sections
  const sections = document.querySelectorAll(
    '.pain-card, .feature-card, .curriculum-item, .audience-card, .faq-item, .stat, .product-card, .pricing-card, .author__content'
  );

  sections.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 80}ms`;
  });

  // Intersection Observer for reveals
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Animate stat numbers
  const statNumbers = document.querySelectorAll('.stat__number[data-target]');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const isStatic = el.dataset.static === 'true';

          if (isStatic) {
            el.textContent = '0';
            statObserver.unobserve(el);
            return;
          }

          let current = 0;
          const duration = 1200;
          const step = target / (duration / 16);

          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            el.textContent = Math.round(current);
          }, 16);

          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => statObserver.observe(el));
});