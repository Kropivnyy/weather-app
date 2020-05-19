import { alert } from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';
import { defaults } from '@pnotify/core';
import axios from 'axios';
import apiService from './apiService';
import widgetTemplate from '../templates/current-weather.hbs';
import refs from './refs';
import createClock from './timerService';
import renderSunsetTime from './render-sunset-time';
import backgroundImageService from './backgroundService';

defaults.width = '300px';

let geolocation = 'kyiv';

const notice = alert({
  title: 'Know your location',
  icon: false,
  hide: false,
  closer: false,
  sticker: false,
  destroy: true,
  modules: new Map([
    [
      PNotifyConfirm,
      {
        confirm: true,
      },
    ],
  ]),
});
notice.on('pnotify:confirm', () => {
  navigator.geolocation.getCurrentPosition(success, error);
});
notice.on('pnotify:cancel', () => {
  apiWidget(geolocation);

  backgroundImageService.background(geolocation);
});

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  axios
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f90fa88067a545f5a0186799be47863f`,
    )
    .then(res => {
      geolocation = res.data.results[0].components.city;

      apiWidget(geolocation);

      backgroundImageService.background(geolocation);
    });
}

function error(error) {
  console.log(`not found your place, error${error}`);
}

function apiWidget(place) {
  apiService.query = place.toLowerCase();
  apiService.fetchTodayWeather().then(() => {
    const widgetMarkup = widgetTemplate(apiService.todayResponse);
    refs.currentWeather.innerHTML = widgetMarkup;
    createClock('#timer-1');
    renderSunsetTime(apiService.todayResponse);
  });
}

export default notice;
