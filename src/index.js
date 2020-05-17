import './styles.scss';
import refs from './js/refs';
import apiService from './js/apiService';
import widgetTemplate from './templates/current-weather.hbs';
import createClock from './js/timerService';
import renderSunsetTime from './js/render-sunset-time';

apiService.fetchCurrentWeather().then(() => {
  const widgetMarkup = widgetTemplate(apiService.apiResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  createClock('#timer-1');
  renderSunsetTime(apiService.apiResponse);
});

refs.searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  apiService.query = refs.formInput.value.toLowerCase();
  await apiService.fetchCurrentWeather();
  const widgetMarkup = widgetTemplate(apiService.apiResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  createClock('#timer-1');
  renderSunsetTime(apiService.apiResponse);
});
