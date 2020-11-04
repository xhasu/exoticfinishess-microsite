(function(){

  const swapTextures = () => {
    let main = document.querySelector('.showcase-textures .texture-main');
    let listTexture = document.querySelectorAll('.showcase-textures .texture-item');
    
    listTexture.item(0).append(main.querySelector('a'));
    $(main).append(listTexture.item(0).querySelector('a'));
    listTexture.item(0).parentNode.append(listTexture.item(0));  
  };

  let timerSwapTextures = setInterval(swapTextures, 4000);

  // parallax - rellax
  new Rellax('.bg-lines .bg-media', {
    speed: 4,
    center: true,
  })

  new Rellax('.bg-circle.bg-right .bg-media', {
    speed: 6,
    center: true,
  })

  new Rellax('.bg-circle.bg-left .bg-media', {
    speed: 6,
    center: true,
  })

  // fancybox
  $.fancybox.defaults.backFocus = false;

  $('.fancybox-galley_launch .swiper-slide:not(.swiper-slide-duplicate) [data-fancybox="galley_launch"]').fancybox({});


  // swiper
  let swipers = document.querySelectorAll('.showcase-swiper');

  swipers.forEach(swiper => {

    let el = swiper.querySelector('.swiper-container');
    let paginationEl = swiper.querySelector('.swiper-pagination');
  
    new Swiper(el, {
      loop: true,
      threshold: 20,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: paginationEl,
        type:  'bullets',
        clickable: true,
      }
    });

  });

  // scrollview
  let toView = document.querySelectorAll('[data-to-view^="#"]');
  let toViewSize = toView.length;

  for( let i  = 0; i < toViewSize; i++){
    toView.item(i).addEventListener('click', function(e) {
      e.preventDefault()
      document.querySelector(this.getAttribute('data-to-view')).scrollIntoView({behavior: 'smooth'});
    })
  }

  // header sticky
  let throttleTimeoutHeader = null;
  let stickyObserver = document.querySelector('.sticky-observer');
  let headerElement = document.querySelector('.header');

  function handleSticky () {

    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let diffTop = stickyObserver.getBoundingClientRect().y + scrolled;

    if (scrolled >= diffTop - 57) {
      headerElement.classList.add('isSticky');
    } else {
      headerElement.classList.remove('isSticky');
    }

    throttleTimeoutHeader = null;
  };

  function _throttleSticky(){
    if (throttleTimeoutHeader == null)
      throttleTimeoutHeader = setTimeout(handleSticky, 120);
  }

  if( stickyObserver ){
    _throttleSticky();
    window.addEventListener("scroll", _throttleSticky);
  }

  // hero stage
  let throttleTimeoutHero = null;
  let stageObserverFirst = document.querySelector('.hero-observer.first');
  let stageObserverSecond = document.querySelector('.hero-observer.second');
  let heroWrapperElement = document.querySelector('.hero-wrapper');

  function handleHeroStage () {

    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let diffStageFirstTop = stageObserverFirst.getBoundingClientRect().y + scrolled;
    let diffStageScondTop = stageObserverSecond.getBoundingClientRect().y + scrolled;

    if (scrolled >= diffStageFirstTop && scrolled <= diffStageScondTop) {
      heroWrapperElement.classList.add('stage-1');
    } else if (scrolled >= diffStageScondTop) {
      heroWrapperElement.classList.remove('stage-1');
      heroWrapperElement.classList.add('stage-2');
    } else {
      heroWrapperElement.classList.remove('stage-1');
      heroWrapperElement.classList.remove('stage-2');
    }

    throttleTimeoutHero = null;
  };

  function _throttleHeroStage(){
    if (throttleTimeoutHero == null)
      throttleTimeoutHero = setTimeout(handleHeroStage, 120);
  }

  if( stageObserverFirst && stageObserverSecond){
    _throttleHeroStage();
    window.addEventListener("scroll", _throttleHeroStage);
  }

  // typewriter
  function heroType () {
    let i = 0;
    let el = document.querySelector('.hero .hero-title');
    let txt = el.getAttribute('title');
    let dist = el.querySelector('span');
    let speed = 120;
    const timer = () => {
      let size = txt.length;
      if( i < size ){
        dist.innerHTML += txt.charAt(i);
        i++;
        setTimeout(timer, speed);
      }
      if (i == (size - 1)) {
        el.querySelector('i').remove();
      }
    }
    timer();
  }

  setTimeout(() => {
    heroType();
  }, 1400);

  // AOS animation
  AOS.init();

  // load background
  let bgPage = document.querySelector('[data-background]');
  if( bgPage ) {
    let bgPageSrc = bgPage.querySelector('img').src;
    bgPage.style.backgroundImage = "url('" + bgPageSrc + "')";
  }

})();