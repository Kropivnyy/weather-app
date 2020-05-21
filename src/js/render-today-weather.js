import refs from './refs';
import apiService from './apiService';
import widgetTemplate from '../templates/current-weather.hbs';
import createClock from './timerService';
import renderSunsetTime from './render-sunset-time';

export default function () {
  if (refs.switchToTodayBtn.dataset.rendered === 'true') {
    return;
  }
  const widgetMarkup = widgetTemplate(apiService.todayResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  createClock('#timer-1');
  renderSunsetTime(apiService.todayResponse);
  refs.switchToTodayBtn.dataset.rendered = true;
  refs.moreInfoWrapper.classList.remove('five-days__more-information-enabled');
}
