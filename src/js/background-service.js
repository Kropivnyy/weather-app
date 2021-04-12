import refs from './refs';
import axios from 'axios';
import weatherService from './weather-service';

const unsplashApiKey = 'x9AhgqdVedkj92knzoynGC04XskWUCMDGAsuL6NaIdM';

export default {
  background: function (query) {
    if (weatherService.apiResponse) {
      axios
        .get(
          `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${query}&page=1&per_page=10&orientation=landscape`,
        )
        .then(res => {
          const image =
            res.data.results[this.randomIndex(0, res.data.results.length - 1)];
          if (window.matchMedia('(min-width: 1280px)').matches) {
            this.backgroundImage(image.urls.regular);
          } else {
            this.backgroundImage(image.urls.small);
          }
        })
        .catch(error => {
          console.warn(error);
          this.background('sky');
        });
    }
  },

  backgroundImage: function (source) {
    refs.body.style.backgroundImage = `linear-gradient(#0a05054d, #0a0505bf), url('${source}')`;
  },

  randomIndex: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
