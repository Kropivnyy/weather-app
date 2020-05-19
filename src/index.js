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
import './js/forecast-five-day-info';

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

    await apiService.fetchTodayWeather();
    await apiService.fetchFiveDaysWeather();

    const widgetMarkup = widgetTemplate(apiService.todayResponse);
    refs.currentWeather.innerHTML = widgetMarkup;
    renderFiveDays();
    createClock('#timer-1');
    renderSunsetTime(apiService.todayResponse);

    if (apiService.apiResponse) {
      ///if in favorites-section all OK
      favorites.formSubmitted(true);
    }

    backgroundImageService.background(refs.formInput.value);
  } catch (error) {
    console.log(error);
  }
});

refs.switchDaysBtn.addEventListener('click', onClick);

function onClick(e) {
  if (e.target.dataset.days === 'oneDay') {
    if (e.target.classList.contains('switch-days-btn__set-day-btn--active')) {
      const widgetMarkup = widgetTemplate(apiService.todayResponse);
      refs.currentWeather.innerHTML = widgetMarkup;
      createClock('#timer-1');
      renderSunsetTime(apiService.todayResponse);
    }
  }

  if (e.target.dataset.days === 'fiveDays') {
    if (e.target.classList.contains('switch-days-btn__set-day-btn--active')) {
      renderFiveDays();
    }
  }
}
