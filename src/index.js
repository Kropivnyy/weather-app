import './styles.scss';
import refs from './js/refs';
import apiService from './js/apiService';
// import getCurrentTime from './js/get-current-time';
import widgetTemplate from './templates/current-weather.hbs';
import backgroundImageService from './js/backgroundService';

refs.searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  apiService.query = refs.formInput.value.toLowerCase();
  await apiService.fetchCurrentWeather();
  console.log(apiService.apiResponse);
  const markup = widgetTemplate(apiService.apiResponse);
  refs.currentWeather.innerHTML = markup;

  await backgroundImageService.background(refs.formInput.value);
});
