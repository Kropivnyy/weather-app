import './styles.scss';
import debounce from 'lodash.debounce';
import refs from './js/refs';
import apiService from './js/apiService';
import getCurrentTime from './js/get-current-time';

refs.input.addEventListener(
  'input',
  debounce(async () => {
    apiService.query = refs.input.value.toLowerCase();
    const data = await apiService.fetchImages();
    console.log(data);
    console.log(getCurrentTime(data));
  }, 500),
);
