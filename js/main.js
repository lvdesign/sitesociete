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

  //
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);


  //  // Scroll reveal calls
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
    navigator.serviceWorker.register('https://lvdesign.github.io/sitevitrine/service-worker.js', { scope: 'https://lvdesign.github.io/sitevitrine/' }).then(function(reg) {
      // registration worked
      console.log('OK-- Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };


})(jQuery);
