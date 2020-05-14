import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/';
const apiKey = 'c112c800340c3f1ee2fad83b32fe690c';

export default {
  searchQuery: '',
  pageNumber: 1,
  result: {},
  date: 0,
  fetchImages: async function () {
    try {
      const { data } = await axios.get(
        `weather?q=${this.query}&units=metric&appid=${apiKey}`,
      );
      this.result = { ...data };
      this.date = data.dt + data.timezone;
      // console.log(`this.date: ${this.date}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  resetResult() {
    this.result = [];
  },
  resetPage() {
    this.pageNumber = 1;
  },
  pageIncrement() {
    this.pageNumber += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    return (this.searchQuery = value);
  },
};
