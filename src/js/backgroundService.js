import refs from './refs';
import axios from 'axios';

const pixabayApiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';

export default {
  background: function (query) {
    axios
      .get(
        `https://pixabay.com/api?key=${pixabayApiKey}&q=${query}&image_type=photo&orientation=horizontal&category=places+travel&per_page=3`,
      )
      .then(res => {
        const image =
          res.data.hits[this.randomIndex(0, res.data.hits.length - 1)]
            .largeImageURL;
        this.backgroundImage(image);
      })
      .catch(() => {
        this.background('sky');
        // refs.body.style.background = `linear-gradient(#f5f5f500, #0a0505b3), url('/images/primary_bg.jpg') no-repeat center/cover fixed`;
      });
  },

  backgroundImage: function (source) {
    refs.body.style.background = `linear-gradient(#f5f5f500, #0a0505b3), url('${source}') no-repeat center/cover fixed`;
  },

  randomIndex: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
