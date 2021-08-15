var PhotoSwipe = require('photoswipe');
var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');

export default ( { $items } ) => {
  var slides = [];
  const inited = {};
  $items.each(function ( i, el ) {
    var $el = $(el);
    const index = $el.data('index');
    if (!inited[index]) {
      slides.push({
        src:      $el.attr('href'),
        w:        $el.data('width'),
        h:        $el.data('height'),
        title:    $el.data('title'),
        subtitle: $el.data('subtitle'),
        index:    index,
      });
      inited[index] = true;
    }

    $el.off('click', $el.data('openGalleryHandler'));

    const onClick = function ( e ) {
      e.preventDefault();
      openGallery(+index);
    };
    $el.data('openGalleryHandler', onClick);
    $el.on('click', onClick);
  });

  slides = slides.sort(( a, b ) => a.index === b.index ? 0 : a.index > b.index ? 1 : -1);

  function openGallery( i ) {
    var gallery = new PhotoSwipe(
      $('.pswp')[0],
      PhotoSwipeUI_Default,
      slides,
      {
        index:            i,
        history:          false,
        closeOnScroll:    false,
        maxSpreadZoom:    1,
        // getDoubleTapZoom: function ( isMouseClick, item ) {
        //   return item.initialZoomLevel;
        // },
        pinchToClose:     false,
        addCaptionHTMLFn: function ( item, captionEl, isFake ) {
          // item      - slide object
          // captionEl - caption DOM element
          // isFake    - true when content is added to fake caption container
          //             (used to get size of next or previous caption)

          if (!item.title && !item.subtitle) {
            captionEl.children[0].innerHTML = '';
            return false;
          }

          let html = '';
          if (item.title) html += `<div class="pswp__title">${item.title}</div>`;
          if (item.subtitle) html += item.subtitle;
          captionEl.children[0].innerHTML = html;
          return true;
        },

      },
    );

    gallery.init();

    // var isDown = false;
    // var $container = $('.pswp__item');
    // $container.on('mousedown.gallery', function ( e ) {
    //   isDown = true;
    //   $container.on('mousemove.gallery', function () {
    //     isDown = false;
    //   });
    //
    //   $container.on('mouseup.gallery', function ( e ) {
    //     $container.off('mouseup.gallery mousemove.gallery');
    //     if (isDown) {
    //       gallery.next();
    //       isDown = false;
    //     }
    //   });
    // });
    //
    // gallery.listen('destroy', function () {
    //   $container.off('mousedown.gallery');
    // });
  }
};
