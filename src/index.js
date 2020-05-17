import './styles.scss';
import './js/randomCitation';
import refs from './js/refs';
import apiService from './js/apiService';
import getCurrentTime from './js/get-current-time';
import favorites from './js/favoritesService';
// import getCurrentTime from './js/get-current-time';
import widgetTemplate from './templates/current-weather.hbs';
import backgroundImageService from './js/backgroundService';
import geolocation from './js/geolocationService';

favorites.loader(); // получаем данные при загрузке страницы из localStorage

refs.searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  apiService.query = refs.formInput.value.toLowerCase();
  await apiService.fetchCurrentWeather();

  ///if in favorites-section all OK
  favorites.formSubmitted(true);

  console.log(apiService.apiResponse);
  const markup = widgetTemplate(apiService.apiResponse);
  refs.currentWeather.innerHTML = markup;

  backgroundImageService.background(refs.formInput.value);
});
