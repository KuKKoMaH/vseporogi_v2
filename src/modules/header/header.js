// import { openMenu }   from "src/modules/headerMenu/headerMenu";
// import { openSearch } from "src/modules/headerSearch/headerSearch";
//
const $header = $('.header');
//
// $('.header__hamburger').on('click', () => {
//   openMenu();
// });
//
// $('.header__search').on('click', openSearch);
//
// $('.header__mobileHamburger').on('click', () => {
//   $header.toggleClass('header--active');
//   $('.header__mobileHamburger').toggleClass('header__mobileHamburger--active');
// });
//

$('.header__button').on('click', () => {
  $header.toggleClass('header--active');
})
