import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';
import { defaults } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';

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
  console.log(e.detail.value);
});
notice.on('pnotify:cancel', () => {
  console.log('cancel');
  console.log(defaults);
});

export default notice;
