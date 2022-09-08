$(window).on('load', function() {
  mobileMenuAlignment();
});
$(window).on('resize', function() {
  mobileMenuAlignment();
});

new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
});

new Glider(document.querySelector('.header-list-wrap'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      }
    }
  ]
});

// Mobile Menu
jQuery('header .hamburger').on('click', function() {
  jQuery(this).toggleClass('is-active');
  jQuery('.mobile-menu').toggleClass('is-active');
});

// MOBILE MENU DYNAMIC MARGIN & PADDING
function mobileMenuAlignment() {
  var headerHeight = jQuery( "header" ).outerHeight();

  // Mobile Menu
  jQuery( ".mobile-menu" ).css( 'top', headerHeight);
}