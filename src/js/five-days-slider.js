import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import $ from 'jquery';
import refs from './refs';

export default {
  createSlider() {
    $('.five-days__list').slick({
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      variableWidth: false,
      mobileFirst: true,
      nextArrow: $('.five-days__next-day-btn'),
      prevArrow: $('.five-days__prev-day-btn'),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 5,
          },
        },
      ],
    });
    this.buttonsActivate();
  },

  deleteSlider() {
    if (refs.forecastFiveDaysList.classList.contains('slick-initialized')) {
      $('.five-days__list').slick('unslick');
    }
    this.buttonsDeactivate();
  },

  buttonsActivate() {
    refs.fiveDaysBtn.addEventListener('click', this.controlByButtons);
  },

  buttonsDeactivate() {
    refs.fiveDaysBtn.removeEventListener('click', this.controlByButtons);
  },

  controlByButtons(e) {
    const firstElementOfList = document.querySelector(
      '.five-days__list .slick-slide[data-slick-index="0"]',
    );
    const lastElementOfList = document.querySelector(
      '.five-days__list .slick-slide[data-slick-index="4"]',
    );

    if (firstElementOfList.getAttribute('aria-hidden') === 'false') {
      refs.fiveDaysPrevDayBtn.classList.add('not-active-buttons');
    } else {
      refs.fiveDaysPrevDayBtn.classList.remove('not-active-buttons');
    }

    if (lastElementOfList.getAttribute('aria-hidden') === 'false') {
      refs.fiveDaysNextDayBtn.classList.add('not-active-buttons');
    } else {
      refs.fiveDaysNextDayBtn.classList.remove('not-active-buttons');
    }
  },
};
