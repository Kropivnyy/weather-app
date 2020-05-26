import refs from './refs';
import weatherService from './weather-service';
import amountDays from './rendering-amount-of-days';
import fiveDaysCityTemplate from '../templates/forecast-five-days-city.hbs';
import fiveDaysItemTemplate from '../templates/forecast-five-days-item.hbs';
import moreInfoTemplate from '../templates/forecast-five-days-info.hbs';
import slider from './five-days-slider';

export default function () {
  event.preventDefault();

  if (amountDays.currentDays !== 'fiveDays') return;

  const markupCity = fiveDaysCityTemplate(weatherService.forecastFiveDays.city);
  refs.forecastFiveDaysCity.innerHTML = markupCity;

  const markupOneDay = fiveDaysItemTemplate(
    weatherService.forecastFiveDays.list,
  );
  refs.forecastFiveDaysList.innerHTML = markupOneDay;
  slider.createSlider();
  refs.switchToFiveDaysBtn.dataset.rendered = true;
  let openLoadMore = null;

  refs.forecastFiveDaysList.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.nodeName !== 'A') return;
    refs.moreInfoWrapper.classList.add('five-days__more-information-enabled');
    const indexDay = e.target.dataset.index;

    if (openLoadMore === null) {
      e.target.classList.add('five-days__more-info--active');
      openLoadMore = e.target;
      markupMoreInfo(indexDay);
      return;
    }
    if (openLoadMore === e.target) {
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
      markupMoreInfo(indexDay);
      return;
    }
  });
}

const markupMoreInfo = number => {
  refs.forecastMoreInfo.innerHTML = moreInfoTemplate(
    weatherService.forecastFiveDays.list[number].byHours,
  );
  return;
};
