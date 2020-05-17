import refs from './refs';
import item from '../templates/favorites-item.hbs';
import debounce from 'lodash.debounce';
export default {
    favorites: [],
    submit: false,
    currentCity: null,

    loader() {
        if (localStorage.getItem('favorites')) {
            this.favorites = JSON.parse(localStorage.getItem('favorites'));
            if (this.favorites.length > 0) {
                this.favorites.forEach(values => this.updateItemMarckup(values));
                this.displayFavorites();
            }
            refs.favoritesList.addEventListener('click', (this.onItemClick.bind(this)));
            refs.formInput.addEventListener('input', debounce(this.changeIconDefault.bind(this), 500));
        }
    },

    formSubmitted(result) {
        this.submit = result;
        if (this.submit) {
            const value = refs.formInput.value;
            this.currentCity = value.toLowerCase();
            if (this.serchInLocalStorage()) {
                this.changeIconOnFavorites();
            } else {
                this.iconClass('active', 'add');
                this.iconClass('in-favorites', 'remove');
                refs.formAddToFavorites.disabled = false;
                refs.formAddToFavorites.addEventListener('click', (this.addOnClick.bind(this)));
            }
        }
    },

    addOnClick() {
        if (!this.serchInLocalStorage()) {
            this.changeIconOnFavorites();
            this.favorites.push(this.currentCity);
            this.updateItemMarckup(this.currentCity);
            this.rewritingLocalStorage();
            this.iconClass('active', 'remove');
            this.displayFavorites();
        }
    },

    onItemClick(event) {
        if (event.target.nodeName === 'I') {
            const city = event.target.parentNode.previousElementSibling.textContent;
            const index = this.favorites.indexOf(city);
            const itemHref = event.target.parentNode.parentNode;
            itemHref.remove();
            this.favorites.splice(index);
            this.rewritingLocalStorage();
            if (refs.formInput.value === city) this.changeIconDefault();
            if (refs.favoritesList.children.length === 0)
                this.displayFavorites('remove', true);
        }
        if (event.target.nodeName === 'A') {
            event.preventDefault();
            refs.formInput.value = event.target.textContent;
            this.changeIconOnFavorites();
            //запрос к api ... рендеринг страницы
        }
        return;
    },

    displayFavorites(action = 'add', disabled = false) {
        refs.searchFavorites.classList[action]('isset-favorites');
        refs.favoritesArrowLeft.disabled = disabled;
    },

    changeIconOnFavorites() {
        refs.formIconStar.innerHTML = 'star';
        this.iconClass('in-favorites', 'add');
    },

    changeIconDefault() {
        refs.formIconStar.innerHTML = 'star_border';
        this.iconClass('in-favorites', 'remove');
    },

    iconClass(name, action) {
        refs.formIconStar.classList[action](name);
    },

    serchInLocalStorage() {
        return this.favorites.includes(this.currentCity);
    },

    rewritingLocalStorage() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },

    updateItemMarckup(name) {
        refs.favoritesList.insertAdjacentHTML('afterbegin', item(name));
    }
}