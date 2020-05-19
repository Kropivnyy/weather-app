import refs from './refs';
import apiService from './apiService';
import amountDays from './rendering-amount-of-days';
import fiveDaysCityTemplate from '../templates/forecast-five-days-city.hbs';
import fiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';
import moreInfoTemplate from '../templates/forecast-five-days-info.hbs';

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
  }

  console.log(apiService.fiveDaysResponse);
}
