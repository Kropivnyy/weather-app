import axios from 'axios';
import getCurrentTime from './get-current-time';
import { notice, defaults } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';
import 'animate.css/animate.min.css';
defaults.delay = '2000';

const apiKey = 'c112c800340c3f1ee2fad83b32fe690c';

export default {
  searchQuery: 'Kyiv',
  apiResponse: false,
  todayResponse: [],
  forecastFiveDays: [],
  dataForChart: {
    date: [],
    temp: [],
    humidity: [],
    pressure: [],
    wind: [],
  },
  fetchByCoordinates: async function (lat, lon) {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
      );
      this.apiResponse = true;
      this.todayResponse = data;
      this.roundTodayTemperature(this.todayResponse);
      this.createIconLink(this.todayResponse);
      return data;
    } catch (error) {
      this.apiResponse = false;
      console.log(error);
    }
  },
  fetchTodayWeather: async function () {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.query}&units=metric&appid=${apiKey}`,
      );
      this.apiResponse = true;
      this.todayResponse = data;
      this.roundTodayTemperature(this.todayResponse);
      this.createIconLink(this.todayResponse);
      return data;
    } catch (error) {
      this.apiResponse = false;
      console.log(error);

      notice({
        text: 'Check your city name',
        width: '300px',
        modules: new Map([
          [
            PNotifyAnimate,
            {
              inClass: 'bounceInLeft',
              outClass: 'bounceOutLeft',
            },
          ],
        ]),
      });
    }
  },
  fetchFiveDaysWeather: async function () {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&units=metric&appid=${apiKey}`,
      );
      this.apiResponse = true;
      const getDate = data => new Date(data).getDate();
      const dates = data.list
        .map(el => {
          const { total, time } = getCurrentTime(data.city.timezone, el.dt);
          el.dt_txt = `${('0' + time.getHours()).slice(-2)}:${(
            '0' + time.getMinutes()
          ).slice(-2)}`;
          return (el.dt = total);
        })
        .map(element => getDate(element))
        .filter((el, idx, arr) => arr.indexOf(el) === idx);
      let list = dates.map(el =>
        data.list.filter(elem => getDate(elem.dt) === el),
      );
      list.length = 5;
      list = list.map((element, index, array) =>
        this.getForecastByDays(element, index, array),
      );
      this.forecastFiveDays = {
        ...data,
        list,
      };
      this.changeMoreInfo(this.forecastFiveDays);
      this.getDataForChart(this.forecastFiveDays.list);
    } catch (error) {
      this.apiResponse = false;
      console.log(error);
    }
  },
  roundTodayTemperature(array) {
    array.main.temp = Math.round(array.main.temp);
    array.main.temp_min = Math.round(array.main.temp_min);
    array.main.temp_max = Math.round(array.main.temp_max);
  },
  createIconLink(array) {
    array.weather = {
      description: array.weather[0].description,
      icon: `https://openweathermap.org/img/w/${array.weather[0].icon}.png`,
    };
  },
  calcMinMaxTemp(array) {
    let minTempArray = [];
    let maxTempArray = [];
    array.forEach(el => {
      minTempArray = [...minTempArray, ...el.main.temp_min];
    });
    array.forEach(el => {
      maxTempArray = [...maxTempArray, ...el.main.temp_max];
    });
    let temp_min = minTempArray[0];
    let temp_max = maxTempArray[0];
    for (let i = 1; i < minTempArray.length; ++i) {
      if (minTempArray[i] < temp_min) temp_min = minTempArray[i];
    }
    for (let i = 1; i < maxTempArray.length; ++i) {
      if (maxTempArray[i] > temp_max) temp_max = maxTempArray[i];
    }
    temp_min = Math.round(temp_min);
    temp_max = Math.round(temp_max);
    return { temp_min, temp_max };
  },
  calcDate(array) {
    const time = new Date(array[0].dt);
    const locales = 'en-US';
    const month = time.toLocaleString(locales, { month: 'short' });
    const day = time.toLocaleString(locales, { weekday: 'long' });
    const date = time.toLocaleString(locales, { day: 'numeric' });
    return {
      month,
      day,
      date,
    };
  },
  getForecastByDays(element, index, array) {
    if (index === 0) {
      return {
        byHours: element,
        byDays: {
          date: this.calcDate(element),
          icon: `https://openweathermap.org/img/w/${element[0].weather[0].icon}.png`,
          description: element[0].weather[0].description,
          temp: this.calcMinMaxTemp(element),
          index: index,
        },
      };
    } else {
      const num = 8 - array[0].length;
      return {
        byHours: element,
        byDays: {
          date: this.calcDate(element),
          icon: `https://openweathermap.org/img/w/${element[num].weather[0].icon}.png`,
          description: element[num].weather[0].description,
          temp: this.calcMinMaxTemp(element),
          index: index,
        },
      };
    }
  },
  changeMoreInfo(array) {
    array.list.forEach(i => {
      i.byHours.forEach(j => {
        j.weather = {
          description: j.weather[0].description,
          icon: `https://openweathermap.org/img/w/${j.weather[0].icon}.png`,
        };
        j.main.temp = Math.round(j.main.temp);
        j.main.pressure = Math.round((j.main.pressure * 1000) / 1.333 / 1000);
      });
    });
  },
  getDataForChart(array) {
    this.resetDataForChart();
    array.forEach(element => {
      const date = `${element.byDays.date.month} ${element.byDays.date.date}`;
      const averageTemp = (
        element.byHours.reduce((acc, el) => acc + el.main.temp, 0) /
        element.byHours.length
      ).toFixed(2);
      const averageHumidity = Math.round(
        element.byHours.reduce((acc, el) => acc + el.main.humidity, 0) /
          element.byHours.length,
      );
      const averagePressure = Math.round(
        element.byHours.reduce((acc, el) => acc + el.main.pressure, 0) /
          element.byHours.length,
      );
      const averageWind = (
        element.byHours.reduce((acc, el) => acc + el.wind.speed, 0) /
        element.byHours.length
      ).toFixed(2);
      this.dataForChart = {
        date: [...this.dataForChart.date, ...date],
        temp: [...this.dataForChart.temp, ...averageTemp],
        humidity: [...this.dataForChart.humidity, ...averageHumidity],
        pressure: [...this.dataForChart.pressure, ...averagePressure],
        wind: [...this.dataForChart.wind, ...averageWind],
      };
    });
  },
  resetDataForChart() {
    this.dataForChart = {
      date: [],
      temp: [],
      humidity: [],
      pressure: [],
      wind: [],
    };
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    return (this.searchQuery = value);
  },
};
