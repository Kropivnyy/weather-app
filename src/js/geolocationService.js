import apiService from './apiService';
import refs from './refs';
import renderTodayWeather from './render-today-weather';
import favorites from './favoritesService';
import backgroundImageService from './backgroundService';

export default function () {
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
        backgroundImageService.background(data.name);
        favorites.formSubmitted(apiService.apiResponse);
        refs.switchToTodayBtn.dataset.rendered = true;
      });
    })
    .catch(error => {
      console.log(error.message);
    });
}
