import refs from './refs';
import apiService from './apiService';
import amountDays from './rendering-amount-of-days';
import forecastFiveDaysCityNameTemplate from '../templates/forecast-five-days-city.hbs';
import forecastFiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';

export default function () {
  refs.switchDaysBtn.addEventListener('click', event => {
    if (event.target.nodeName !== 'A' || amountDays.currentDays === 'oneDay')
      return;

    if (amountDays.currentDays === 'fiveDays') {
      console.log(event.target);

      console.log(apiService.fiveDaysResponseCity);

      const markupCity = forecastFiveDaysCityNameTemplate(
        apiService.fiveDaysResponseCity,
      );
      refs.forecastFiveDays.insertAdjacentHTML('beforeend', markupCity);

      const markupOneDay = apiService.forecastFiveDays.reduce((acc, day) => {
        const markup = forecastFiveDaysItemTemplate(day);
        acc += markup;
        return acc;
      }, '');
      refs.forecastFiveDays
        .querySelector('.five-days__list')
        .insertAdjacentHTML('beforeend', markupOneDay);
    }
  });
}
