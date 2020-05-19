import './styles.scss';
import './js/randomCitation';
import amountDays from './js/rendering-amount-of-days';
import refs from './js/refs';
import apiService from './js/apiService';
import favorites from './js/favoritesService';
import widgetTemplate from './templates/current-weather.hbs';
import createClock from './js/timerService';
import renderSunsetTime from './js/render-sunset-time';
import backgroundImageService from './js/backgroundService';
import geolocation from './js/geolocationService';
import renderFiveDays from './js/render-five-days';

favorites.loader(); // получаем данные при загрузке страницы из localStorage

apiService.fetchTodayWeather().then(() => {
  const widgetMarkup = widgetTemplate(apiService.todayResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  createClock('#timer-1');
  renderSunsetTime(apiService.todayResponse);
});

// refs.switchDaysBtn.addEventListener('click', async event => {
//   event.preventDefault();
//   apiService.query = refs.formInput.value.toLowerCase();
//   await apiService.fetchFiveDaysWeather();
//   renderFiveDays();
// });

refs.searchForm.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    apiService.query = refs.formInput.value.toLowerCase();
    if (amountDays.currentDays === 'oneDay') {
      await apiService.fetchTodayWeather();
      const widgetMarkup = widgetTemplate(apiService.todayResponse);
      refs.currentWeather.innerHTML = widgetMarkup;
      createClock('#timer-1');
      renderSunsetTime(apiService.todayResponse);
    } else {
      await apiService.fetchFiveDaysWeather();
      renderFiveDays();
    }
    if (apiService.apiResponse) {
      ///if in favorites-section all OK
      favorites.formSubmitted(true);

      backgroundImageService.background(refs.formInput.value);
    }
  } catch (error) {
    console.log(error);
  }
});
