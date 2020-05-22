import refs from './refs';
import apiService from './apiService';
import amountDays from './rendering-amount-of-days';
import fiveDaysCityTemplate from '../templates/forecast-five-days-city.hbs';
import fiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';
import moreInfoTemplate from '../templates/forecast-five-days-info.hbs';
import slider from './five-days-slider';

export default function () {
  event.preventDefault();

  if (amountDays.currentDays !== 'fiveDays') {
    return;
  }

  const markupCity = fiveDaysCityTemplate(apiService.forecastFiveDays.city);
  refs.forecastFiveDaysCity.innerHTML = markupCity;

  const markupOneDay = fiveDaysItemTemplate(apiService.forecastFiveDays.list);
  refs.forecastFiveDaysList.innerHTML = markupOneDay;
  slider.createSlider();
  refs.switchToFiveDaysBtn.dataset.rendered = true;

  refs.forecastFiveDaysList.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.nodeName !== 'A') {
      return;
    }
    refs.moreInfoWrapper.classList.add('five-days__more-information-enabled');
    const indexDay = e.target.dataset.index;
    dayNumber(indexDay);
  });
}

function dayNumber(number) {
  if (number === '1') {
    const markupMoreInfo = moreInfoTemplate(apiService.firstDayForecast);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;
    return;
  }
  if (number === '2') {
    const markupMoreInfo = moreInfoTemplate(apiService.secondDayForecast);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;
    return;
  }
  if (number === '3') {
    const markupMoreInfo = moreInfoTemplate(apiService.thirdDayForecast);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;
    return;
  }
  if (number === '4') {
    const markupMoreInfo = moreInfoTemplate(apiService.fourthDayForecast);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;
    return;
  }
  if (number === '5') {
    const markupMoreInfo = moreInfoTemplate(apiService.fifthDayForecast);
    refs.forecastMoreInfo.innerHTML = markupMoreInfo;
    return;
  }
}
