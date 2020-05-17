import { alert } from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';
import { defaults } from '@pnotify/core';
import backgroundImageService from './backgroundService';

defaults.width = '300px';

const notice = alert({
  title: 'Choice your city:',
  icon: false,
  hide: false,
  closer: false,
  sticker: false,
  destroy: true,
  modules: new Map([
    [
      PNotifyConfirm,
      {
        prompt: true,
      },
    ],
  ]),
});
notice.on('pnotify:confirm', e => {
  backgroundImageService.background(e.detail.value);
});
notice.on('pnotify:cancel', () => {
  backgroundImageService.background('kyiv');
});

export default notice;
