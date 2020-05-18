import './styles.scss';
import './js/randomCitation';
// import './js/rendering-amount-of-days';
import refs from './js/refs';
import apiService from './js/apiService';
import favorites from './js/favoritesService';
import widgetTemplate from './templates/current-weather.hbs';
import createClock from './js/timerService';
import renderSunsetTime from './js/render-sunset-time';
import backgroundImageService from './js/backgroundService';
import geolocation from './js/geolocationService';
import forecastFiveDays from './js/forecastFiveDays';

favorites.loader(); // получаем данные при загрузке страницы из localStorage

// ============
// перенес в геолокацию при отмене

// apiService.fetchTodayWeather().then(() => {
//   const widgetMarkup = widgetTemplate(apiService.todayResponse);
//   refs.currentWeather.innerHTML = widgetMarkup;
//   createClock('#timer-1');
//   renderSunsetTime(apiService.todayResponse);
// });
// ============

// refs.switchDaysBtn.addEventListener('click', async event => {
//   event.preventDefault();
//   apiService.query = refs.formInput.value.toLowerCase();
//   await apiService.fetchFiveDaysWeather();
// });

refs.searchForm.addEventListener('submit', async event => {
  try {
    event.preventDefault();

    apiService.query = refs.formInput.value.toLowerCase();
    await apiService.fetchTodayWeather();

    ///if in favorites-section all OK
    favorites.formSubmitted(true);

    const widgetMarkup = widgetTemplate(apiService.todayResponse);
    refs.currentWeather.innerHTML = widgetMarkup;
    createClock('#timer-1');
    renderSunsetTime(apiService.todayResponse);

    backgroundImageService.background(refs.formInput.value);
  } catch (error) {
    console.log(error);
  }

  console.log(apiService.fiveDaysResponseCity);
});

// ================= еще не закончил
// forecastFiveDays();
