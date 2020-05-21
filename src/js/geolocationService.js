import apiService from './apiService';
import refs from './refs';
import renderTodayWeather from './render-today-weather';
import favorites from './favoritesService';

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getCurrentPosition()
  .then(({ coords: { latitude, longitude } }) => {
    apiService.fetchByCoordinates(latitude, longitude).then(data => {
      apiService.searchQuery = data.name;
      refs.formInput.value = data.name;
      renderTodayWeather();
      favorites.formSubmitted(apiService.apiResponse);
    });
  })
  .catch(error => {
    console.log(error.message);
  });
