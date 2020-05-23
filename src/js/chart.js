import 'chart.js';
import refs from './refs';
import weatherService from './weather-service';

export const dataChart = {
  setDataChart() {
    this.days = weatherService.dataForChart.date;
    this.temperature = weatherService.dataForChart.temp;
    this.humidity = weatherService.dataForChart.humidity;
    this.wind = weatherService.dataForChart.wind;
    this.atmosphere = weatherService.dataForChart.pressure;
  },

  dataExist() {
    return this.days &&
      this.temperature &&
      this.humidity &&
      this.wind &&
      this.atmosphere
      ? true
      : false;
  },

  get data() {
    return {
      days: this.days,
      temperature: this.temperature,
      humidity: this.humidity,
      wind: this.wind,
      atmosphere: this.atmosphere,
    };
  },
};

const createChart = {
  chart: null,
  setData(label, data, color, hidden = false) {
    return {
      label: label,
      data: data,
      hidden: hidden,
      borderColor: color,
      lineTension: 0,
      fill: false,
      borderColor: `rgba(${color}, 1)`,
      backgroundColor: 'transparent',
      pointBorderColor: `rgba(${color}, 1)`,
      pointBackgroundColor: `rgba(${color}, .4)`,
      pointHoverRadius: 8,
      pointBorderWidth: 3,
      pointStyle: 'rectRounded',
    };
  },

  clientWidth() {
    return refs.body.clientWidth < 767 ? false : true;
  },

  options() {
    return {
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.541)',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        align: 'start',
        labels: {
          boxWidth: 15,
        },
      },
      maintainAspectRatio: this.clientWidth(),
    };
  },

  create() {
    if (!dataChart.dataExist()) return;
    const data = dataChart.data;
    this.chart = new Chart(refs.schedule, {
      type: 'line',
      data: {
        labels: data.days,
        datasets: [
          this.setData('Temperature, C°', data.temperature, '255, 107, 8'),
          this.setData('Humidity, %', data.humidity, '9, 6, 234', true),
          this.setData('Wind Speed, m/s', data.wind, '235, 155, 5', true),
          this.setData(
            'Atmosphere Pressure, m/m',
            data.atmosphere,
            '5, 120, 6',
            true,
          ),
        ],
      },
      options: this.options(),
    });
    Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 0.541)';
    Chart.defaults.global.defaultFontSize = 14;
    if (!this.clientWidth()) {
      Chart.defaults.global.responsive = false;
      refs.schedule.style.height = '430px';
    }
  },

  update() {
    this.chart.destroy();
    this.create();
    this.chart.resize();
  },
};

export const renderChart = {
  chartCreated: false,
  chartShow: false,
  showOnClick() {
    if (!dataChart.dataExist()) return; //можно поставить вывод ошибки, нет даннных ....
    this.classAction();
    this.renderBtn();
    refs.chartHide.addEventListener('click', this.hideOnClick.bind(this));
    if (!this.chartCreated && !this.chartShow) createChart.create();
    if (this.chartCreated && !this.chartShow) this.updateChart();
    this.chartCreated = true;
    this.chartShow = true;
  },

  updateChart() {
    createChart.update();
  },

  renderBtn(show = 'remove', hide = 'add') {
    refs.chartShow.classList[show]('chart__show-enabled');
    refs.chartHide.classList[hide]('chart__show-enabled');
  },

  hideOnClick() {
    this.chartShow = false;
    this.classAction('remove');
    this.renderBtn('add', 'remove');
  },

  hideOnSwitchDays() {
    this.classAction('remove');
    this.renderBtn('add', 'remove');
  },

  showOnSwitchDays() {
    this.classAction();
    this.renderBtn();
  },

  classAction(action = 'add') {
    refs.chartWrapper.classList[action]('chart-bg-is-active');
    refs.scheduleWrapper.classList[action]('schedule__wrapper-enabled');
    refs.chart.classList[action]('chart_enabled-schedule');
  },
};

refs.chartShow.addEventListener(
  'click',
  renderChart.showOnClick.bind(renderChart),
);
