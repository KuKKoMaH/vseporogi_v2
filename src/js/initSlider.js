import { Swiper, Navigation, Pagination, Lazy, Autoplay } from 'swiper';
import Breakpoints                                        from 'breakpoints-js';

Swiper.use([Navigation, Pagination, Lazy, Autoplay]);

export default ( selector, props, initOptions ) => {
  if (!initOptions) initOptions = {};
  initOptions = Object.assign({}, {
    sm: true,
    md: true,
    lg: true,
  }, initOptions);

  const $wrapper = $(selector);
  if ($wrapper.length) {
    $wrapper.each(( i, el ) => {
      let slider = null;
      const $el = $(el);

      const initSlider = () => {
        if (slider) return;
        const finalProps = typeof props === 'function' ? props($el) : props;
        if (!finalProps) return;
        slider = new Swiper(el, typeof props === 'function' ? props($el) : props);
        if (initOptions.afterInit) initOptions.afterInit(slider, $el);
      };

      const destroySlider = () => {
        if (!slider) return;
        slider.destroy();
        slider = null;
      };

      Breakpoints.on('sm', 'enter', () => {
        initOptions.sm ? initSlider() : destroySlider();
      });
      Breakpoints.on('md', 'enter', () => {
        initOptions.md ? initSlider() : destroySlider();
      });
      Breakpoints.on('lg', 'enter', () => {
        initOptions.lg ? initSlider() : destroySlider();
      });
    });
  }
}
