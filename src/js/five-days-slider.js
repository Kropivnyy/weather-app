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
    });
  },

  deleteSlider() {
    if (refs.forecastFiveDaysList.classList.contains('slick-initialized')) {
      $('.five-days__list').slick('unslick');
    }
  },

  buttonsActivate() {
    refs.fiveDaysBtn.addEventListener('click', function (e) {
      console.log(e.target);
      console.log(e.currentTarget);
    });
  },
};
