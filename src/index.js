import './styles.scss';
import refs from './js/refs';
import apiService from './js/apiService';
import getCurrentTime from './js/get-current-time';
import dateTemplate from './templates/current-date.hbs';
import widgetTemplate from './templates/current-weather.hbs';
import { createClock, timer } from './js/timerService';
createClock(timer.selector, timer.targetDate);
refs.searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  apiService.query = refs.formInput.value.toLowerCase();
  await apiService.fetchCurrentWeather();
  const widgetMarkup = widgetTemplate(apiService.apiResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  /* Сделать таймер */
  const dateMarkup = dateTemplate(
    getCurrentTime(apiService.apiResponse.timezone),
  );
  refs.forecastToday.innerHTML = dateMarkup;
});
