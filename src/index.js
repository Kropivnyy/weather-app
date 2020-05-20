import './styles.scss';
import './js/randomCitation';
import refs from './js/refs';
import backgroundImageService from './js/backgroundService';
import favorites from './js/favoritesService';
import apiService from './js/apiService';
import renderTodayWeather from './js/render-today-weather';
import renderFiveDays from './js/render-five-days';
import geolocationService from './js/geolocationService';
import amountDays from './js/rendering-amount-of-days';

favorites.loader(); // получаем данные при загрузке страницы из localStorage

apiService.fetchTodayWeather().then(() => {
  renderTodayWeather();
});

refs.switchDaysBtn.addEventListener('click', async event => {
  try {
    event.preventDefault();
    if (event.target.dataset.days === 'oneDay') {
      await apiService.fetchTodayWeather();
      renderTodayWeather();
    }
    if (event.target.dataset.days === 'fiveDays') {
      await apiService.fetchFiveDaysWeather();
      renderFiveDays();
    }
  } catch (error) {
    console.log(error);
  }
});

refs.searchForm.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    apiService.query = refs.formInput.value.toLowerCase();
    if (amountDays.currentDays === 'oneDay') {
      await apiService.fetchTodayWeather();
      renderTodayWeather();
    } else {
      await apiService.fetchFiveDaysWeather();
      renderFiveDays();
    }
    if (apiService.apiResponse) {
      ///if in favorites-section all OK
      favorites.formSubmitted(true);
    }

    backgroundImageService.background(refs.formInput.value);
  } catch (error) {
    console.log(error);
  }
});
