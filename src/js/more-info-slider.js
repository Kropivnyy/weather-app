import refs from './refs';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  itemsArray: null,
  swiper: null,
  create() {
    refs.fiveDaysMoreInfoScrollbar.classList.remove(
      'five-days__more-information-scrollbar--hidden',
    );
    this.itemsArray = refs.forecastMoreInfo.querySelectorAll(
      '.more-information__item',
    );
    this.itemsArray.forEach(e => e.classList.add('swiper-slide'));
    if (this.itemsArray.length > 4) {
      refs.fiveDaysMoreInfoBtn.classList.remove(
        'five-days__more-information-btn--hidden',
      );
    }
    refs.forecastMoreInfo.classList.add('swiper-wrapper');
    this.swiper = new Swiper('.five-days__more-information', {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: '.more-information__next-btn-js',
        prevEl: '.more-information__prev-btn-js',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        dragSize: 120,
      },
    });
  },

  destroy() {
    this.itemsArray.forEach(e => e.classList.remove('swiper-slide'));
    refs.fiveDaysMoreInfoBtn.classList.add(
      'five-days__more-information-btn--hidden',
    );
    refs.forecastMoreInfo.classList.remove('swiper-wrapper');
    this.swiper.destroy();
  },
};
