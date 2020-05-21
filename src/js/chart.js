import 'chart.js';
import refs from './refs';

const chartRender = {
    showOnClick() {
        refs.chartWrapper.classList.add('chart-bg-is-active');
        refs.scheduleWrapper.classList.add('schedule__wrapper-enabled');
        this.renderBtn();
        refs.chartHide.addEventListener('click', this.hideSchedule.bind(this));
        this.responsive = refs.body.clientWidth < 767 ? false : true;
        this.makeSchedule();
    },

    renderBtn(show = 'remove', hide = 'add') {
        refs.chartShow.classList[show]('chart__show-enabled');
        refs.chartHide.classList[hide]('chart__show-enabled');
    },

    hideSchedule() {
        this.renderBtn('add', 'remove');
        refs.chartWrapper.classList.remove('chart-bg-is-active');
        refs.scheduleWrapper.classList.remove('schedule__wrapper-enabled');
    },

    set daysQuery(values) {
        this.days = values;
    },

    set temperatureQuery(values) {
        this.temperature = values;
    },

    set humidityQuery(values) {
        this.humidity = values;
    },

    set windQuery(values) {
        this.wind = values;
    },

    set atmosphereQuery(values) {
        this.atmosphere = values;
    },

    dataSets(label, data, color, hidden = false) {
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
            pointStyle: 'rectRounded'
        }
    },

    makeSchedule() {
        this.chart = new Chart(refs.chart, {
            type: 'line',
            data: {
                labels: this.days,
                datasets: [
                    this.dataSets('Temperature, C°', this.temperature, '255, 107, 8'),
                    this.dataSets('Humidity, %', this.humidity, '9, 6, 234', true),
                    this.dataSets('Wind Speed, m/s', this.wind, '235, 155, 5', true),
                    this.dataSets('Atmosphere Pressure, m/m', this.atmosphere, '5, 120, 6', true),
                ],
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(255, 255, 255, 0.541)',
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(255, 255, 255, 0.541)',
                        },
                        ticks: {
                            beginAtZero: true,
                        }
                    }],
                },
                legend: {
                    align: 'start',
                    labels: {
                        boxWidth: 15,
                    }
                },
                maintainAspectRatio: this.responsive,
            }
        });
        Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 0.541)';
        Chart.defaults.global.defaultFontSize = 14;
        if (!this.responsive) {
            Chart.defaults.global.responsive = false;
            refs.chart.style.height = '430px';
        }
    }
};

refs.chartShow.addEventListener('click', chartRender.showOnClick.bind(chartRender));

//перенести!
chartRender.daysQuery = ['Feb 9, 2020', 'Feb 10, 2020', 'Feb 11, 2020', 'Feb 12, 2020', 'Feb 13, 2020'];
chartRender.temperatureQuery = ['-3', '10', '8', '-3', '15'];
chartRender.humidityQuery = ['1', '8', '13', '18', '3', '8'];
chartRender.windQuery = ['5', '3', '15', '21', '18', '26'];
chartRender.atmosphereQuery = ['15', '3', '18', '14', '11', '15', '18', '22'];


