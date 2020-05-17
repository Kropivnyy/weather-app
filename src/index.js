import './styles.scss';
import './js/randomCitation';
import './js/rendering-amount-of-days';
import refs from './js/refs';
import apiService from './js/apiService';
import favorites from './js/favoritesService';
import widgetTemplate from './templates/current-weather.hbs';
import createClock from './js/timerService';
import renderSunsetTime from './js/render-sunset-time';
import backgroundImageService from './js/backgroundService';
import geolocation from './js/geolocationService';

favorites.loader();// получаем данные при загрузке страницы из localStorage

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

  ///if in favorites-section all OK
  favorites.formSubmitted(true);

  const widgetMarkup = widgetTemplate(apiService.apiResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  createClock('#timer-1');
  renderSunsetTime(apiService.apiResponse);
  backgroundImageService.background(refs.formInput.value);
});
