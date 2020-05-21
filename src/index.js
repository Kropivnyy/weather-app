import './styles.scss';
import './js/randomCitation';
import refs from './js/refs';
import backgroundImageService from './js/backgroundService';
import favorites from './js/favoritesService';
import apiService from './js/apiService';
import renderTodayWeather from './js/render-today-weather';
import renderFiveDays from './js/render-five-days';
import renderGeolocationPosition from './js/geolocationService';
import amountDays from './js/rendering-amount-of-days';
import './js/forecast-five-day-info';
import slider from './js/five-days-slider';
import resetInfoAboutRendering from './js/reset-info-about-rendering'

favorites.loader(); // получаем данные при загрузке страницы из localStorage


apiService.fetchTodayWeather().then(() => {
  renderTodayWeather();
  refs.switchToTodayBtn.dataset.rendered = false;
  renderGeolocationPosition();
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
      resetInfoAboutRendering()
      slider.deleteSlider();
      await apiService.fetchTodayWeather();
      renderTodayWeather();
    } else {
      resetInfoAboutRendering()
      slider.deleteSlider();
      refs.moreInfoWrapper.classList.remove(
        'five-days__more-information-enabled',
      );
      await apiService.fetchFiveDaysWeather();
      renderFiveDays();
    }

    favorites.formSubmitted(apiService.apiResponse);

    backgroundImageService.background(refs.formInput.value);
  } catch (error) {
    console.log(error);
  }
});
