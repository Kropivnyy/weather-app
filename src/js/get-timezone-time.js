export default function (time, timezone) {
  time.setHours(time.getUTCHours() + timezone / 3600);
  return time;
}
