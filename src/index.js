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
import slider from './js/five-days-slider';
import resetInfoAboutRendering from './js/reset-info-about-rendering';
import './js/chart';
import { dataChart } from './js/chart';// для теста перенести

favorites.loader(); // получаем данные при загрузке страницы из localStorage

apiService.fetchTodayWeather().then(() => {
  renderTodayWeather();
  refs.switchToTodayBtn.dataset.rendered = true;
  renderGeolocationPosition();
});

refs.switchDaysBtn.addEventListener('click', async event => {
  try {
    event.preventDefault();
    if (event.target.dataset.days === 'oneDay') {
      if (refs.switchToTodayBtn.dataset.rendered === 'true') {
        return;
      }
      await apiService.fetchTodayWeather();
      renderTodayWeather();
    }
    if (event.target.dataset.days === 'fiveDays') {
      if (refs.switchToFiveDaysBtn.dataset.rendered === 'true') {
        return;
      }
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
      resetInfoAboutRendering();
      slider.deleteSlider();
      await apiService.fetchTodayWeather();
      renderTodayWeather();
    } else {
      resetInfoAboutRendering();
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


//для теста Заполнение данными графика
dataChart.daysQuery = ['Feb 18, 2020', 'Feb 10, 2020', 'Feb 11, 2020', 'Feb 12, 2020', 'Feb 13, 2020'];
dataChart.temperatureQuery = ['-3', '10', '8', '-3', '15'];
dataChart.humidityQuery = ['1', '8', '13', '18', '3', '8'];
dataChart.windQuery = ['5', '3', '15', '21', '18', '26'];
dataChart.atmosphereQuery = ['15', '3', '18', '14', '11', '15', '18', '22'];