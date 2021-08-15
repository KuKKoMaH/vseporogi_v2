import scriptLoader from '../js/scriptLoader';

const YANDEX_MAP_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&ver=1&onload=INIT_MAP';
const $maps = $('.map');
if ($maps.length) scriptLoader(YANDEX_MAP_URL);

// const destroyMap = () => {
//   if (map) {
//     map.destroy();
//     map = null;
//   }
// };

window.INIT_MAP = ( ymaps ) => {
  $maps.each(( i, el ) => {
    const { lat, lng, label } = el.dataset;
    if (!lat || !lng) return;
    const coors = [lat, lng];

    const map = new ymaps.Map(el, {
      center: coors,
      zoom:   12,
    });

    const placemark = new ymaps.Placemark(coors, { balloonContent: label });
    map.geoObjects.add(placemark);

    // map.setBounds(map.geoObjects.getBounds());
  });

};
