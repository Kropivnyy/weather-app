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

    refs.forecastFiveDaysList.addEventListener('click', e => {
      e.preventDefault();

      if (e.target.nodeName === 'A') {
        refs.moreInfoWrapper.classList.add(
          'five-days__more-information-enabled',
        );
        const indexDay = e.target.getAttribute('data-index');
        dayNumber(indexDay);
        return;
      } else {
        return;
      }
    });
  }
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
