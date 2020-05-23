import weatherService from './weather-service';
import getCurrentTime from './get-current-time';

export default function (clock) {
  const idRef = document.querySelector(clock);
  const dateRef = idRef.querySelector('[data-value="date"]');
  const suffixRef = idRef.querySelector('[data-value="suffix"]');
  const dayRef = idRef.querySelector('[data-value="day"]');
  const monthRef = idRef.querySelector('[data-value="month"]');
  const hoursRef = idRef.querySelector('[data-value="hours"]');

  function updateTime() {
    const t = getCurrentTime(weatherService.todayResponse.timezone);
    dateRef.textContent = t.date;
    if (t.date === '1' || t.date === '21' || t.date === '31') {
      suffixRef.textContent = 'st';
    } else if (t.date === '2' || t.date === '22') {
      suffixRef.textContent = 'nd';
    } else if (t.date === '3' || t.date === '23') {
      suffixRef.textContent = 'rd';
    } else {
      suffixRef.textContent = 'th';
    }
    dayRef.textContent = t.day;
    monthRef.textContent = t.month;
    hoursRef.textContent = `${('0' + t.hours).slice(-2)}:${('0' + t.mins).slice(
      -2,
    )}:${('0' + t.secs).slice(-2)}`;
  }
  updateTime();
  const timerId = setInterval(updateTime, 1000);
}
