import { BREAKPOINT_LG } from "src/js/breakpoints";
import initSlider        from "src/js/initSlider";

initSlider('.spare__slider', ( $el ) => ({
  wrapperClass:  'spare__items',
  slideClass:    'spare__item',
  navigation:    {
    prevEl: $el.parents('.spare').find('.nav__item--prev')[0],
    nextEl: $el.parents('.spare').find('.nav__item--next')[0],
  },
  pagination:      {
    el:        $el.parents('.spare').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
}));
