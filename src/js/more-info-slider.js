import refs from './refs';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  itemsArray: null,
  swiper: null,
  resize: null,
  create() {
    this.resize = this.onScreenResize.bind(this);
    window.addEventListener('resize', this.resize);

    refs.forecastMoreInfo.addEventListener(
      'transitionstart',
      this.addedButtonsStile,
    );
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
      slidesPerView: 2,
      spaceBetween: 10,
      navigation: {
        nextEl: '.more-information__next-btn-js',
        prevEl: '.more-information__prev-btn-js',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        dragSize: 90,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
          scrollbar: {
            dragSize: 120,
          },
        },
        1280: {
          slidesPerView: 8,
        },
      },
    });
  },

  destroy() {
    window.removeEventListener('resize', this.resize);
    refs.forecastMoreInfo.removeEventListener(
      'transitionstart',
      this.addedButtonsStile,
    );
    this.itemsArray.forEach(e => e.classList.remove('swiper-slide'));
    refs.fiveDaysMoreInfoBtn.classList.add(
      'five-days__more-information-btn--hidden',
    );
    refs.forecastMoreInfo.classList.remove('swiper-wrapper');
    this.swiper.destroy();
  },

  addedButtonsStile() {
    if (
      refs.fiveDaysMoreInfoBtn.firstElementChild.firstElementChild.getAttribute(
        'tabindex',
      ) === '0'
    ) {
      refs.fiveDaysMoreInfoBtn.firstElementChild.classList.remove(
        'not-active-buttons',
      );
    } else {
      refs.fiveDaysMoreInfoBtn.firstElementChild.classList.add(
        'not-active-buttons',
      );
    }
    if (
      refs.fiveDaysMoreInfoBtn.lastElementChild.firstElementChild.getAttribute(
        'tabindex',
      ) === '0'
    ) {
      refs.fiveDaysMoreInfoBtn.lastElementChild.classList.remove(
        'not-active-buttons',
      );
    } else {
      refs.fiveDaysMoreInfoBtn.lastElementChild.classList.add(
        'not-active-buttons',
      );
    }
  },
  onScreenResize() {
    this.swiper.update();
  },
};
