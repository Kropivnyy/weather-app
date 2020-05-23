import refs from './refs';
import weatherService from './weather-service';
import widgetTemplate from '../templates/current-weather.hbs';
import createClock from './timer-service';
import renderSunsetTime from './render-sunset-time';

export default function () {
  const widgetMarkup = widgetTemplate(weatherService.todayResponse);
  refs.currentWeather.innerHTML = widgetMarkup;
  createClock('#timer-1');
  renderSunsetTime(weatherService.todayResponse);
  refs.switchToTodayBtn.dataset.rendered = true;
  refs.moreInfoWrapper.classList.remove('five-days__more-information-enabled');
}
