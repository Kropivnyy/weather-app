import weatherService from './weather-service';
import refs from './refs';
import renderTodayWeather from './render-today-weather';
import favorites from './favorites-service';
import backgroundImageService from './background-service';

export default function () {
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getCurrentPosition()
    .then(({ coords: { latitude, longitude } }) => {
      weatherService.fetchByCoordinates(latitude, longitude).then(data => {
        weatherService.searchQuery = data.name;
        refs.formInput.value = data.name;
        renderTodayWeather();
        backgroundImageService.background(weatherService.searchQuery);
        favorites.formSubmitted(weatherService.apiResponse);
        refs.switchToTodayBtn.dataset.rendered = true;
      });
    })
    .catch(error => {
      console.log(error.message);
    });
}
