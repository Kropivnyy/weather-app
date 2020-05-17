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
    },
    fiveDays() {
        this.activeAmount('lastElementChild', 'firstElementChild');
    },

    activeAmount(add, remove) {
        const className = 'switch-days-btn__set-day-btn--active';
        refs.switchDaysBtn[add].classList.add(className);
        refs.switchDaysBtn[remove].classList.remove(className);
    }
};
refs.switchDaysBtn.addEventListener('click', amountDays.changeOnClick.bind(amountDays));