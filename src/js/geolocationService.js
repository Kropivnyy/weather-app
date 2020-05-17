import { alert } from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';
import { defaults } from '@pnotify/core';
import axios from 'axios';

import backgroundImageService from './backgroundService';
import apiService from './apiService';
import widgetTemplate from '../templates/current-weather.hbs';
import refs from './refs';

defaults.width = '300px';

let geolocation = '';

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
  navigator.geolocation.getCurrentPosition(success);
});
notice.on('pnotify:cancel', () => {
  backgroundImageService.background('kyiv');
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
      backgroundImageService.background(geolocation);
    });
}

export default notice;
