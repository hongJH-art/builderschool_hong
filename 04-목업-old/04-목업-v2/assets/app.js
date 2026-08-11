/* ============================================================
   AI 빌더 그룹 — 목업 공통 스크립트
   GNB 스크롤 · 리빌 · GA4 이벤트 콘솔 스텁
   ============================================================ */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* GNB: 스크롤 시 배경 블러 (높이 고정 — 00-공통 스펙) */
  var gnb = document.querySelector('.gnb');
  function onScroll() { gnb && gnb.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 모바일 메뉴 */
  var burger = document.querySelector('.gnb__burger');
  if (burger) burger.addEventListener('click', function () {
    gnb.classList.toggle('menu-open');
    burger.textContent = gnb.classList.contains('menu-open') ? '✕' : '☰';
  });

  /* 리빌 (IntersectionObserver) */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('on'); });
  }

  /* GA4 이벤트 스텁 — 목업에서는 콘솔 기록. 실제 구현 시 gtag()로 교체 */
  window.track = function (name, params) {
    console.log('[GA4]', name, params || {});
  };
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      var p = {};
      if (el.dataset.location) p.location = el.dataset.location;
      if (el.dataset.slug) p.slug = el.dataset.slug;
      if (el.dataset.topic) p.topic = el.dataset.topic;
      window.track(el.dataset.track, p);
    });
  });
})();
