import refs from './refs';

const amountDays = {
    currentDays: 'oneDay',
    changeOnClick(event) {
        event.preventDefault();
        if (event.target.nodeName !== 'A') return;
        this.currentDays = event.target.dataset.days;
        this[this.currentDays]();
    },
    oneDay() {
        this.activeAmount('firstElementChild', 'lastElementChild');
        this.renderingAmount('remove');
    },
    fiveDays() {
        this.activeAmount('lastElementChild', 'firstElementChild');
        this.renderingAmount();
    },

    renderingAmount(action = 'add') {
        refs.currentWeather.classList[action]('current-weather-disabled');
        refs.forecastToday.classList[action]('forecast__today-disabled');
        refs.forecastFiveDays.classList[action]('forecast__five-days-enabled');
        refs.citation.classList[action]('citation-disabled');
    },

    activeAmount(add, remove) {
        const className = 'switch-days-btn__set-day-btn--active';
        refs.switchDaysBtn[add].classList.add(className);
        refs.switchDaysBtn[remove].classList.remove(className);
    }

};
refs.switchDaysBtn.addEventListener('click', amountDays.changeOnClick.bind(amountDays));