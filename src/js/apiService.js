import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/';
const apiKey = 'c112c800340c3f1ee2fad83b32fe690c';

export default {
  searchQuery: 'Kyiv',
  apiResponse: {},
  fetchCurrentWeather: async function () {
    try {
      const { data } = await axios.get(
        `weather?q=${this.query}&units=metric&appid=${apiKey}`,
      );
      this.apiResponse = data;
      this.roundTemperature();
      this.createIconLink();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  roundTemperature() {
    this.apiResponse.main.temp = Math.round(this.apiResponse.main.temp);
    this.apiResponse.main.temp_min = Math.round(this.apiResponse.main.temp_min);
    this.apiResponse.main.temp_max = Math.round(this.apiResponse.main.temp_max);
  },
  createIconLink() {
    this.apiResponse.weather = `http://openweathermap.org/img/w/${this.apiResponse.weather[0].icon}.png`;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    return (this.searchQuery = value);
  },
};
