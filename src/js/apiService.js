import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/';
const apiKey = 'c112c800340c3f1ee2fad83b32fe690c';

export default {
  searchQuery: 'Kyiv',
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
  fetchTodayWeather: async function () {
    try {
      const { data } = await axios.get(
        `weather?q=${this.query}&units=metric&appid=${apiKey}`,
      );
      this.todayResponse = data;
      this.roundTodayTemperature();
      this.createIconLink();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchFiveDaysWeather: async function () {
    try {
      const { data } = await axios.get(
        `forecast?q=${this.query}&units=metric&appid=${apiKey}`,
      );
      this.fiveDaysResponse = data.list;
      this.fiveDaysResponseCity = data.city;
      this.sortResponseOnArrays();
      this.getForecastFiveDays(
        this.firstDayForecast,
        this.secondDayForecast,
        this.thirdDayForecast,
        this.fourthDayForecast,
        this.fifthDayForecast,
      );
      this.changeMoreInfoTime([
        this.firstDayForecast,
        this.secondDayForecast,
        this.thirdDayForecast,
        this.fourthDayForecast,
        this.fifthDayForecast,
      ]);
      console.log(this.forecastFiveDays);
      console.log(
        this.firstDayForecast,
        this.secondDayForecast,
        this.thirdDayForecast,
        this.fourthDayForecast,
        this.fifthDayForecast,
      );
    } catch (error) {
      console.log(error);
    }
  },
  roundTodayTemperature() {
    this.todayResponse.main.temp = Math.round(this.todayResponse.main.temp);
    this.todayResponse.main.temp_min = Math.round(
      this.todayResponse.main.temp_min,
    );
    this.todayResponse.main.temp_max = Math.round(
      this.todayResponse.main.temp_max,
    );
  },
  createIconLink() {
    this.todayResponse.weather = `http://openweathermap.org/img/w/${this.todayResponse.weather[0].icon}.png`;
  },
  sortResponseOnArrays() {
    const dayOne = this.fiveDaysResponse[0].dt_txt.slice(0, 10);
    const dayTwo = this.fiveDaysResponse[8].dt_txt.slice(0, 10);
    const dayThree = this.fiveDaysResponse[16].dt_txt.slice(0, 10);
    const dayFour = this.fiveDaysResponse[24].dt_txt.slice(0, 10);
    const dayFive = this.fiveDaysResponse[32].dt_txt.slice(0, 10);
    this.fiveDaysResponse.forEach(element => {
      switch (element.dt_txt.slice(0, 10)) {
        case dayOne:
          this.firstDayForecast = this.fiveDaysResponse.filter(
            el => el.dt_txt.slice(0, 10) === dayOne,
          );
          break;
        case dayTwo:
          this.secondDayForecast = this.fiveDaysResponse.filter(
            el => el.dt_txt.slice(0, 10) === dayTwo,
          );
          break;
        case dayThree:
          this.thirdDayForecast = this.fiveDaysResponse.filter(
            el => el.dt_txt.slice(0, 10) === dayThree,
          );
          break;
        case dayFour:
          this.fourthDayForecast = this.fiveDaysResponse.filter(
            el => el.dt_txt.slice(0, 10) === dayFour,
          );
          break;
        case dayFive:
          this.fifthDayForecast = this.fiveDaysResponse.filter(
            el => el.dt_txt.slice(0, 10) === dayFive,
          );
          break;

        default:
      }
    });
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
    const time = new Date(array[0].dt * 1000);
    // time.setTime(time.getTime() +
    // (time.getTimezoneOffset() * 60 + this.fiveDaysResponseCity.timezone) * 1000,)
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
  getForecastFiveDays(one, two, three, four, five) {
    this.forecastFiveDays = {
      firstDay: {
        date: this.calcDate(one),
        icon: `http://openweathermap.org/img/w/${one[0].weather[0].icon}.png`,
        temp: this.calcMinMaxTemp(one),
      },
      secondDay: {
        date: this.calcDate(two),
        icon: `http://openweathermap.org/img/w/${
          two[8 - one.length].weather[0].icon
        }.png`,
        temp: this.calcMinMaxTemp(two),
      },
      thirdDay: {
        date: this.calcDate(three),
        icon: `http://openweathermap.org/img/w/${
          three[8 - one.length].weather[0].icon
        }.png`,
        temp: this.calcMinMaxTemp(three),
      },
      fourthDay: {
        date: this.calcDate(four),
        icon: `http://openweathermap.org/img/w/${
          four[8 - one.length].weather[0].icon
        }.png`,
        temp: this.calcMinMaxTemp(four),
      },
      fifthDay: {
        date: this.calcDate(five),
        icon: `http://openweathermap.org/img/w/${
          five[8 - one.length].weather[0].icon
        }.png`,
        temp: this.calcMinMaxTemp(five),
      },
    };
  },
  changeMoreInfoTime(array) {
    array.forEach(i => {
      i.forEach(j => {
        j.dt_txt = j.dt_txt.slice(11, 16);
      });
    });
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    return (this.searchQuery = value);
  },
};
