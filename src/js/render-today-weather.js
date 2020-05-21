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
  setTimeout(() => {
    refs.switchToTodayBtn.dataset.rendered = true;
  }, 1000);
  console.log('загрузка 1го дня');
}
