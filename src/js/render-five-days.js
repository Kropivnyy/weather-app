import refs from './refs';
import weatherService from './weather-service';
import amountDays from './rendering-amount-of-days';
import fiveDaysCityTemplate from '../templates/forecast-five-days-city.hbs';
import fiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';
import moreInfoTemplate from '../templates/forecast-five-days-info.hbs';
import slider from './five-days-slider';
import moreInfoSlider from './more-info-slider';

export default function () {
  event.preventDefault();

  if (amountDays.currentDays !== 'fiveDays') {
    return;
  }

  const markupCity = fiveDaysCityTemplate(weatherService.forecastFiveDays.city);
  refs.forecastFiveDaysCity.innerHTML = markupCity;
  createMarkupAndSlider();
  refs.switchToFiveDaysBtn.dataset.rendered = true;
  let openLoadMore = null;

  refs.forecastFiveDaysList.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.nodeName !== 'A') {
      return;
    }
    refs.moreInfoWrapper.classList.add('five-days__more-information-enabled');
    const indexDay = e.target.dataset.index;

    if (openLoadMore === null) {
      e.target.classList.add('five-days__more-info--active');
      openLoadMore = e.target;
      dayNumber(indexDay);
      moreInfoSlider.create();
      return;
    }
    if (openLoadMore === e.target) {
      moreInfoSlider.destroy();

      e.target.classList.remove('five-days__more-info--active');
      openLoadMore = null;
      refs.forecastMoreInfo.innerHTML = '';
      refs.moreInfoWrapper.classList.remove(
        'five-days__more-information-enabled',
      );
      return;
    }
    if (openLoadMore !== e.target) {
      openLoadMore.classList.remove('five-days__more-info--active');
      e.target.classList.add('five-days__more-info--active');
      openLoadMore = e.target;
      dayNumber(indexDay);
      moreInfoSlider.destroy();
      moreInfoSlider.create();

      return;
    }
  });
}

function dayNumber(number) {
  const markupMoreInfo = moreInfoTemplate(
    weatherService.forecastFiveDays.list[number].byHours,
  );
  refs.forecastMoreInfo.innerHTML = markupMoreInfo;
}

async function createMarkupAndSlider() {
  const markupOneDay = await fiveDaysItemTemplate(
    weatherService.forecastFiveDays.list,
  );
  refs.forecastFiveDaysList.innerHTML = markupOneDay;
  slider.createSlider();
}
