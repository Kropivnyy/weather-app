import getTimezoneTime from './get-timezone-time';

export default function ({ timezone }) {
  const time = new Date();
  getTimezoneTime(time, timezone);
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();
  return {
    total: time.getTime(),
    month,
    day,
    date,
    hours,
    mins,
    secs,
  };
}
