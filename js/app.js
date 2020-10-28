(function(){

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
  let throttleTimeout = null;
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

    throttleTimeout = null;
  };

  function _throttleSticky(){
    if (throttleTimeout == null)
      throttleTimeout = setTimeout(handleSticky, 120);
  }

  if( stickyObserver ){
    _throttleSticky();
    window.addEventListener("scroll", _throttleSticky);
  }

  // load background
  let bgPage = document.querySelector('[data-background]');
  if( bgPage ) {
    let bgPageSrc = bgPage.querySelector('img').src;
    bgPage.style.backgroundImage = "url('" + bgPageSrc + "')";
  }

})();