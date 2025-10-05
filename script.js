/* Globals & helpers */
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after minimal delay
    const loader = document.getElementById('loader');
    setTimeout(()=> loader.style.display = 'none', 700);
  
    // Year
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // Typewriter slogan
    const typeEl = document.getElementById('typewriter');
    const texts = ['Transformez vos idées en solutions digitales', 'Design — Développement — Stratégie'];
    let tIndex = 0, charIndex = 0, forward = true;
    function typeLoop(){
      const txt = texts[tIndex];
      if(forward){
        charIndex++;
        if(charIndex > txt.length){ forward = false; setTimeout(typeLoop, 1400); return; }
      } else {
        charIndex--;
        if(charIndex === 0){ forward = true; tIndex = (tIndex+1) % texts.length; setTimeout(typeLoop, 500); return; }
      }
      typeEl.textContent = txt.slice(0,charIndex);
      setTimeout(typeLoop, forward ? 50 : 30);
    }
    typeLoop();
  
    // Slider simple
    const slides = document.querySelectorAll('.slide');
    let sIndex = 0, sliderTimer;
    function showSlide(i){
      slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
    }
    function nextSlide(){
      sIndex = (sIndex+1) % slides.length; showSlide(sIndex);
    }
    function prevSlide(){
      sIndex = (sIndex-1 + slides.length) % slides.length; showSlide(sIndex);
    }
    document.getElementById('next').addEventListener('click', ()=> { nextSlide(); resetSliderTimer(); });
    document.getElementById('prev').addEventListener('click', ()=> { prevSlide(); resetSliderTimer(); });
    function resetSliderTimer(){ clearInterval(sliderTimer); sliderTimer = setInterval(nextSlide, 4500); }
    resetSliderTimer();
  
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  
    // Nav toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', ()=>{
      document.querySelector('.nav').classList.toggle('open');
    });
  
    // IntersectionObserver fade-in for elements with [data-anim]
    const animEls = document.querySelectorAll('[data-anim]');
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0px)';
          entry.target.style.transition = 'all 600ms ease';
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    animEls.forEach(el=>{
      el.style.opacity = 0;
      el.style.transform = 'translateY(12px)';
      io.observe(el);
    });
  
    // Contact form (front-end validation)
    const form = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-msg');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(name.length < 2 || !email.includes('@') || message.length < 10){
        formMsg.textContent = 'Veuillez remplir correctement tous les champs.';
        formMsg.style.color = 'crimson';
        return;
      }
      // Simulate send
      formMsg.style.color = 'var(--blue)';
      formMsg.textContent = 'Message envoyé — Merci ! (simulation)';
      form.reset();
      setTimeout(()=> formMsg.textContent = '', 5000);
    });
  
    // Testimonials carousel
    const testiList = document.getElementById('testi-list');
    const testiItems = Array.from(testiList.children);
    let tCur = 0;
    function showTesti(i){
      testiItems.forEach((it, idx)=>{
        it.style.transform = `translateX(${(idx - i) * 100}%)`;
        it.classList.toggle('active', idx === i);
      });
    }
    showTesti(0);
    document.getElementById('testi-next').addEventListener('click', ()=>{ tCur = (tCur+1) % testiItems.length; showTesti(tCur); });
    document.getElementById('testi-prev').addEventListener('click', ()=>{ tCur = (tCur-1+testiItems.length)%testiItems.length; showTesti(tCur); });
  
    // Back to top button
    const backTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 400) backTop.style.opacity = 1; else backTop.style.opacity = 0.0;
    });
    backTop.addEventListener('click', (e)=>{ e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); });
  
    // Accessibility: contact top button
    document.querySelectorAll('.contact-top').forEach(btn => {
      btn.addEventListener('click', (e)=>{
        const tgt = document.querySelector(btn.dataset.target);
        if(tgt){ tgt.scrollIntoView({behavior:'smooth', block:'center'}); }
      });
    });
  
    // Lightbox on gallery click (simple)
    document.querySelectorAll('.gallery-item').forEach(item=>{
      item.addEventListener('click', ()=>{
        const src = item.querySelector('img').src;
        const light = document.createElement('div');
        light.style.position='fixed'; light.style.inset=0; light.style.background='rgba(0,0,0,0.8)';
        light.style.display='flex'; light.style.alignItems='center'; light.style.justifyContent='center'; light.style.zIndex=9999;
        const img = document.createElement('img'); img.src = src; img.style.maxWidth='90%'; img.style.maxHeight='90%'; img.style.borderRadius='8px';
        light.appendChild(img);
        light.addEventListener('click', ()=> document.body.removeChild(light));
        document.body.appendChild(light);
      });
    });
  
  });

  
  