import 'jquery';
import 'selectize';
// import 'jquery.maskedinput/src/jquery.maskedinput';
import './breakpoints';
import './initMap';
import './initPopups';
import initGallery from "src/js/initGallery";

const initGalleries = () => {
  $('.gallery').each(( i, el ) => {
    initGallery({ $items: $(el).find('.gallery__item') });
  });
};
initGalleries();
window.INIT_GALLERIES = initGalleries;

const $share = $('.share');
if ($share.length) {
  scriptLoader('https://yastatic.net/share2/share.js', () => {
    Ya.share2('share', {
      theme: {
        bare: true,
      },
    });
  });
}

// $('input[type="tel"]').mask("+7 (999) 999-99-99");

$('select').selectize();

$('.toTop').on('click', () => {
  $("html, body").animate({ scrollTop: 0 }, "slow");

});
