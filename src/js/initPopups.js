import MicroModal from 'micromodal';

const config = {
  disableScroll:       true,
  awaitCloseAnimation: true,
  onShow:              ( modal, button, event ) => {
    if (!event) return;
    let $el = $(event.target);
    if (!$el.data('youtubeId')) $el = $el.parents('[data-youtube-id]');
    const youtubeId = $el.data('youtubeId');
    if (youtubeId) {
      const iframe = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
      $(modal).find('.modal__iframe').html(iframe);
    }
  },
  onClose:             modal => {
    $(modal).find('iframe').remove();
  },
};

MicroModal.init(config);

window.showModal = ( modalId ) => {
  $('.modal.is-open').each(( i, el ) => {
    if (el.id === modalId) return;
    MicroModal.close(el.id);
  });
  MicroModal.show(modalId, config);

};

window.showThank = () => showModal('thank-modal');
