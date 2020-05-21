import refs from './refs';
import apiService from './apiService';
import amountDays from './rendering-amount-of-days';
import fiveDaysCityTemplate from '../templates/forecast-five-days-city.hbs';
import fiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';
import moreInfoTemplate from '../templates/forecast-five-days-info.hbs';
import slider from './five-days-slider';

export default function () {
  event.preventDefault();
  if (amountDays.currentDays === 'oneDay') return;

  if (amountDays.currentDays === 'fiveDays') {
    if (refs.switchToFiveDaysBtn.dataset.rendered === 'true') {
      return;
    }

    const markupCity = fiveDaysCityTemplate(apiService.fiveDaysResponseCity);
    refs.forecastFiveDaysCity.innerHTML = markupCity;

    const markupOneDay = fiveDaysItemTemplate(apiService.forecastFiveDays);
    refs.forecastFiveDaysList.innerHTML = markupOneDay;

    const markupMoreInfo = moreInfoTemplate(apiService.fiveDaysResponse);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;

    slider.createSlider();
    refs.switchToFiveDaysBtn.dataset.rendered = true;
  }

  // console.log(apiService.fiveDaysResponse);
}
