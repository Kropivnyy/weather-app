import refs from './refs';
import item from '../templates/favorites-item.hbs';
export default {
    favorites: [],
    submit: false,
    currentCity: null,

    onLoad() {
        if (localStorage.getItem('favorites')) {
            this.favorites = JSON.parse(localStorage.getItem('favorites'));
            this.favorites.forEach(values => this.updateItemMarckup(values));
            this.showFavorites();
        }
    },

    formSubmitted(result) {
        this.submit = result;
        if (this.submit) {
            this.currentCity = refs.formInput.value;
            if (this.serchInLocalStorage()) {
                this.changeIcon();
            } else {
                this.class('active', 'add');
                this.class('in-favorites', 'remove');
                refs.formAddToFavorites.disabled = false;
                refs.formAddToFavorites.addEventListener('click', (this.onClickAdd.bind(this)));
            }
        }
    },

    showFavorites() {
        refs.searchFavorites.classList.add('isset-favorites');
        refs.favoritesArrowLeft.disabled = false;
    },

    onClickAdd() {
        if (!this.serchInLocalStorage()) {
            this.changeIcon();
            this.favorites.push(this.currentCity);
            this.updateItemMarckup(this.currentCity);
            this.rewritingLocalStorage();
            this.class('active', 'remove');
            this.showFavorites();
        }
    },

    class(name, action) {
        refs.formIconStar.classList[action](name);
    },

    changeIcon() {
        refs.formIconStar.innerHTML = 'star';
        this.class('in-favorites', 'add');
    },

    serchInLocalStorage() {
        return this.favorites.includes(this.currentCity);
    },

    rewritingLocalStorage() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },

    updateItemMarckup(name) {
        refs.favoritesList.insertAdjacentHTML('beforeend', item(name));
    }
}
