(function($){

  'use strict';

// nav
$(document).ready(function(){
  $('.sidenav').sidenav();
});
// parallax
$(document).ready(function(){
  $('.parallax').parallax();
});


  // carousel
  $('.carousel').carousel({
    interval: 1500,
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');



      console.log( 'target' , target);

      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

 // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.4,
    distance: '0px'
  }, 300);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://lvdesign.github.io/sitesociete/service-worker.js', { scope: 'https://lvdesign.github.io/sitesociete/' }).then(function(reg) {
      // registration worked
      console.log('OK-- Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };


})(jQuery);
