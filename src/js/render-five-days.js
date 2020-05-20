import refs from './refs';
import apiService from './apiService';
import amountDays from './rendering-amount-of-days';
import fiveDaysCityTemplate from '../templates/forecast-five-days-city.hbs';
import fiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';
import moreInfoTemplate from '../templates/forecast-five-days-info.hbs';

import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

export default function () {
  event.preventDefault();
  if (amountDays.currentDays === 'oneDay') return;

  if (amountDays.currentDays === 'fiveDays') {
    const markupCity = fiveDaysCityTemplate(apiService.fiveDaysResponseCity);
    refs.forecastFiveDaysCity.innerHTML = markupCity;

    const markupOneDay = fiveDaysItemTemplate(apiService.forecastFiveDays);
    refs.forecastFiveDaysList.innerHTML = markupOneDay;

    const markupMoreInfo = moreInfoTemplate(apiService.fiveDaysResponse);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;

    $('.five-days__list').slick({
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      variableWidth: false,
      mobileFirst: true,
      nextArrow: $('.five-days__next-day-btn'),
      prevArrow: $('.five-days__prev-day-btn'),
    });
  }

  // console.log(apiService.fiveDaysResponse);
}
