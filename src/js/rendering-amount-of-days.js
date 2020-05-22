import refs from './refs';
import { renderChart } from './chart.js';

const amountDays = {
  currentDays: 'oneDay',
  changeOnClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'A') return;
    this.currentDays = event.target.dataset.days;
    this[this.currentDays]();
  },
  oneDay() {
    this.activeAmount('firstElementChild', 'lastElementChild');
    this.renderingAmount('remove');
    if (!renderChart.chartCreated) return;
    renderChart.hideOnSwitchDays();
    refs.chartShow.classList.remove('chart__show-enabled');
  },
  fiveDays() {
    this.activeAmount('lastElementChild', 'firstElementChild');
    this.renderingAmount();
    if (!renderChart.chartCreated || !renderChart.chartShow) return;
    renderChart.showOnSwitchDays();
  },

  renderingAmount(action = 'add') {
    refs.currentWeather.classList[action]('current-weather-disabled');
    refs.forecastToday.classList[action]('forecast__today-disabled');
    refs.forecastFiveDays.classList[action]('forecast__five-days-enabled');
    refs.citation.classList[action]('citation-disabled');
    refs.search.classList[action]('search-mb-js');
    refs.chartShow.classList[action]('chart__show-enabled');
    refs.chart.classList[action]('chart_enabled');
  },

  activeAmount(add, remove) {
    const className = 'switch-days-btn__set-day-btn--active';
    refs.switchDaysBtn[add].classList.add(className);
    refs.switchDaysBtn[remove].classList.remove(className);
  },
};
refs.switchDaysBtn.addEventListener(
  'click',
  amountDays.changeOnClick.bind(amountDays),
);

export default amountDays;
