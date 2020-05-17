import refs from './refs';
import getCurrentTime from './get-current-time';

export default function (response) {
  const sunriseTime = getCurrentTime(response.timezone, response.sys.sunrise);
  const sunsetTime = getCurrentTime(response.timezone, response.sys.sunset);

  refs.sunriseToday.textContent = `${sunriseTime.hours}:${
    sunriseTime.mins < 10 ? '0' + sunriseTime.mins : sunriseTime.mins
  }`;
  refs.sunsetToday.textContent = `${sunsetTime.hours}:${
    sunsetTime.mins < 10 ? '0' + sunsetTime.mins : sunsetTime.mins
  }`;
}
