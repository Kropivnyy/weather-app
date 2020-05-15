import getTimezoneTime from './get-timezone-time';

export default function ({ timezone }) {
  const time = new Date();
  getTimezoneTime(time, timezone);
  const locales = 'en-US';
  const month = time.toLocaleString(locales, { month: 'long' });
  const day = time.toLocaleString(locales, { weekday: 'short' });
  const date = time.toLocaleString(locales, { day: 'numeric' });
  const hours = time.toLocaleString(locales, {
    hour12: false,
    hour: '2-digit',
  });
  const mins = time.toLocaleString(locales, { minute: '2-digit' });
  const secs = time.toLocaleString(locales, { second: '2-digit' });
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
