import refs from './refs';

const amountDays = {
    currentDays: 'one',
    changeOnClick(event) {
        if (event.target.nodeName !== 'A') return;
        event.preventDefault();
        this.currentDays = event.target.dataset.days;
        this[this.currentDays];
        console.dir(event.target.dataset.days);
    },
    one() {
        console.log('one');
    },
    five() {
        console.log('five');
    },
};

refs.switchDaysBtn.addEventListener('click', amountDays.changeOnClick.bind(amountDays));