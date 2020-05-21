import refs from './refs';

export default function resetInfoAboutRendering() {
  refs.switchToTodayBtn.dataset.rendered = false;
  refs.switchToFiveDaysBtn.dataset.rendered = false;
}
