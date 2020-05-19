export default function (timezone, time = null) {
  let timeInstance;
  if (time === null) {
    timeInstance = new Date();
  } else {
    timeInstance = new Date(time * 1000);
  }
  timeInstance.setTime(
    timeInstance.getTime() +
      (timeInstance.getTimezoneOffset() * 60 + timezone) * 1000,
  );
  const locales = 'en-US';
  const month = timeInstance.toLocaleString(locales, { month: 'long' });
  const day = timeInstance.toLocaleString(locales, { weekday: 'short' });
  const date = timeInstance.toLocaleString(locales, { day: 'numeric' });
  const hours = timeInstance.toLocaleString(locales, {
    hour12: false,
    hour: '2-digit',
  });
  const mins = timeInstance.toLocaleString(locales, { minute: '2-digit' });
  const secs = timeInstance.toLocaleString(locales, { second: '2-digit' });
  return {
    time: timeInstance,
    total: timeInstance.getTime(),
    month,
    day,
    date,
    hours: hours === '24' ? '0' : hours,
    mins,
    secs,
  };
}
