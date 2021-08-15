import { BREAKPOINT_LG } from "src/js/breakpoints";
import initSlider        from "src/js/initSlider";

initSlider('.examples__slider', ( $el ) => ({
  wrapperClass:  'examples__items',
  slideClass:    'examples__item',
  navigation:    {
    prevEl: $el.parents('.examples').find('.nav__item--prev')[0],
    nextEl: $el.parents('.examples').find('.nav__item--next')[0],
  },
  pagination:      {
    el:        $el.parents('.examples').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
}));
