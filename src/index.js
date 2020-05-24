import './styles.scss';
import './js/random-citation';
import refs from './js/refs';
import backgroundImageService from './js/background-service';
import favorites from './js/favorites-service';
import weatherService from './js/weather-service';
import renderTodayWeather from './js/render-today-weather';
import renderFiveDays from './js/render-five-days';
import renderGeolocationPosition from './js/geolocation-service';
import amountDays from './js/rendering-amount-of-days';
import slider from './js/five-days-slider';
import resetInfoAboutRendering from './js/reset-info-about-rendering';
import './js/chart';
import { dataChart, renderChart } from './js/chart';
import createParticles from './js/background-particles';

favorites.loader();

weatherService.fetchTodayWeather().then(() => {
  renderTodayWeather();
  backgroundImageService.background(weatherService.searchQuery);
  refs.switchToTodayBtn.dataset.rendered = true;
  renderGeolocationPosition();
  createParticles();
});

refs.switchDaysBtn.addEventListener('click', async event => {
  try {
    event.preventDefault();
    if (event.target.dataset.days === 'oneDay') {
      if (refs.switchToTodayBtn.dataset.rendered === 'true') {
        return;
      }
      await weatherService.fetchTodayWeather();
      renderTodayWeather();
    }
    if (event.target.dataset.days === 'fiveDays') {
      if (refs.switchToFiveDaysBtn.dataset.rendered === 'true') {
        return;
      }
      await weatherService.fetchFiveDaysWeather();
      renderFiveDays();
      dataChart.setDataChart();
      if (renderChart.chartCreated) renderChart.updateChart();
    }
  } catch (error) {
    console.log(error);
  }
});

refs.searchForm.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    weatherService.query = refs.formInput.value.toLowerCase();
    if (amountDays.currentDays === 'oneDay') {
      resetInfoAboutRendering();
      slider.deleteSlider();
      await weatherService.fetchTodayWeather();
      renderTodayWeather();
    } else {
      resetInfoAboutRendering();
      slider.deleteSlider();
      refs.moreInfoWrapper.classList.remove(
        'five-days__more-information-enabled',
      );
      await weatherService.fetchFiveDaysWeather();
      renderFiveDays();
    }

    favorites.formSubmitted(weatherService.apiResponse);

    backgroundImageService.background(refs.formInput.value);
  } catch (error) {
    console.log(error);
  }
});
