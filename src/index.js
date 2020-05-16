import './styles.scss';
import refs from './js/refs';
import apiService from './js/apiService';
import getCurrentTime from './js/get-current-time';
import favorites from './js/favoritesService';

favorites.loader();// получаем данные при загрузке страницы из localStorage

refs.searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  apiService.query = refs.formInput.value.toLowerCase();
  const data = await apiService.fetchImages();
  console.log(data);
  console.log(getCurrentTime(data));
  ///if all OK
  favorites.formSubmitted(true);
});
