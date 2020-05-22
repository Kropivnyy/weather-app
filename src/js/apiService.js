import axios from 'axios';
import getCurrentTime from './get-current-time';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'c112c800340c3f1ee2fad83b32fe690c';

export default {
  searchQuery: 'Kyiv',
  apiResponse: false,
  todayResponse: [],
  fiveDaysResponse: [],
  fiveDaysResponseCity: [],
  /* Это в шаблон на пять дней */
  forecastFiveDays: [],
  /* Это в шаблон для more info */
  firstDayForecast: [],
  secondDayForecast: [],
  thirdDayForecast: [],
  fourthDayForecast: [],
  fifthDayForecast: [],
  /* Объект для графика */
  dataForChart: {},
  fetchByCoordinates: async function (lat, lon) {
    try {
      const { data } = await axios.get(
        `weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
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
        `weather?q=${this.query}&units=metric&appid=${apiKey}`,
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
  fetchFiveDaysWeather: async function () {
    try {
      const { data } = await axios.get(
        `forecast?q=${this.query}&units=metric&appid=${apiKey}`,
      );

      const getDate = data => new Date(data).getDate();
      const dates = data.list
        .map(el => {
          const { total, time } = getCurrentTime(data.city.timezone, el.dt);
          return (
            (el.dt = total),
            (el.dt_txt = `${time.getFullYear()}-${(
              '0' +
              (time.getMonth() + 1)
            ).slice(-2)}-${('0' + time.getDate()).slice(-2)} ${(
              '0' + time.getHours()
            ).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}:${(
              '0' + time.getSeconds()
            ).slice(-2)}`)
          );
        })
        .map(element => getDate(element))
        .filter((el, idx, arr) => arr.indexOf(el) === idx);
      const list = dates
        .map(el => data.list.filter(elem => getDate(elem.dt) === el))
        .map((element, index) => this.getForecastByDays(element, index));
      list.length = 5;
      this.forecastFiveDays = {
        ...data,
        list,
      };
      // const changedData = this.forecastFiveDays.map(el => {});
      console.log(this.forecastFiveDays);
      // this.apiResponse = true;
      // this.fiveDaysResponse = list;
      // this.fiveDaysResponseCity = city;
      // this.changeForecastTime(this.fiveDaysResponse);
      // this.sortResponseOnArrays(this.fiveDaysResponse);
      // this.getForecastFiveDays(
      //   this.firstDayForecast,
      //   this.secondDayForecast,
      //   this.thirdDayForecast,
      //   this.fourthDayForecast,
      //   this.fifthDayForecast,
      // );
      // this.changeMoreInfo([
      //   this.firstDayForecast,
      //   this.secondDayForecast,
      //   this.thirdDayForecast,
      //   this.fourthDayForecast,
      //   this.fifthDayForecast,
      // ]);
      // this.getDataForChart(
      //   this.firstDayForecast,
      //   this.secondDayForecast,
      //   this.thirdDayForecast,
      //   this.fourthDayForecast,
      //   this.fifthDayForecast,
      // );
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
  // changeForecastTime(array) {
  //   array.forEach(el => {
  //     const { total, time } = getCurrentTime(
  //       this.fiveDaysResponseCity.timezone,
  //       el.dt,
  //     );
  //     el.dt = total;
  //     el.dt_txt = `${time.getFullYear()}-${('0' + (time.getMonth() + 1)).slice(
  //       -2,
  //     )}-${('0' + time.getDate()).slice(-2)} ${('0' + time.getHours()).slice(
  //       -2,
  //     )}:${('0' + time.getMinutes()).slice(-2)}:${(
  //       '0' + time.getSeconds()
  //     ).slice(-2)}`;
  //   });
  // },
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
      if (minTempArray[i] < temp_min) temp_min = Math.round(minTempArray[i]);
    }
    for (let i = 1; i < maxTempArray.length; ++i) {
      if (maxTempArray[i] > temp_max) temp_max = Math.round(maxTempArray[i]);
    }
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
  getForecastByDays(element, index) {
    console.log(element);
    if (index === 0) {
      return {
        date: element[0].dt,
        byHours: element,
        byDays: {
          date: this.calcDate(element),
          icon: `https://openweathermap.org/img/w/${element[0].weather[0].icon}.png`,
          description: element[0].weather[0].description,
          temp: this.calcMinMaxTemp(element),
          index: index + 1,
        },
      };
    } else {
      return {
        date: element[0].dt,
        byHours: element,
        byDays: {
          date: this.calcDate(element),
          icon: `https://openweathermap.org/img/w/${
            element[8 - element[0].length].weather[0].icon
          }.png`,
          description: element[8 - element[0].length].weather[0].description,
          temp: this.calcMinMaxTemp(element),
          index: index + 1,
        },
      };
    }
  },
  changeMoreInfo(array) {
    array.forEach(i => {
      i.forEach(j => {
        j.dt_txt = j.dt_txt.slice(11, 16);
        j.weather = {
          description: j.weather[0].description,
          icon: `https://openweathermap.org/img/w/${j.weather[0].icon}.png`,
        };
        j.main.temp = Math.round(j.main.temp);
        j.main.pressure = Math.round((j.main.pressure * 1000) / 1.333 / 1000);
      });
    });
  },
  getDataForChart(one, two, three, four, five) {
    let date = this.calcDate(two);
    date = `${date.month} ${date.date}`;
    const averageTemp = Math.round(
      two.reduce((acc, el) => acc + el.main.temp, 0) / two.length,
    );
    const averageHumidity = Math.round(
      two.reduce((acc, el) => acc + el.main.humidity, 0) / two.length,
    );
    const averageWind = Math.round(
      two.reduce((acc, el) => acc + el.wind.speed, 0) / two.length,
    );
    const averagePressure = Math.round(
      two.reduce((acc, el) => acc + el.main.pressure, 0) / two.length,
    );

    console.log(date);
    this.dataForChart = {};
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    return (this.searchQuery = value);
  },
};
