import { BREAKPOINT_LG } from "src/js/breakpoints";
import initSlider        from "src/js/initSlider";

initSlider('.testimonials__slider', ( $el ) => ({
  wrapperClass:  'testimonials__items',
  slideClass:    'testimonials__item',
  navigation:    {
    prevEl: $el.parents('.testimonials').find('.nav__item--prev')[0],
    nextEl: $el.parents('.testimonials').find('.nav__item--next')[0],
  },
  pagination:      {
    el:        $el.parents('.testimonials').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
}));
