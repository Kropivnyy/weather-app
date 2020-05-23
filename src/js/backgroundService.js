import refs from './refs';
import axios from 'axios';

// const apiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';
const id = 'x9AhgqdVedkj92knzoynGC04XskWUCMDGAsuL6NaIdM';

export default {
  background: function (query) {
    axios
      .get(
        // `https://pixabay.com/api?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&category=places+travel&per_page=3`,
        `https://api.unsplash.com/search/photos/?order_by=oldest&per_page=5&orientation=landscape&query=${query}&client_id=${id}`,
      )
      .then(res => {
        // const image = res.data.hits[0].largeImageURL;
        // this.backgroundImage(query, `url('${image}')`);

        const image =
          res.data.results[this.randomIndex(0, res.data.results.length - 1)]
            .links.download;
        this.backgroundImage(query, `url('${image}')`);
      })
      .catch(error => console.log('not have image('));
  },

  backgroundImage: function (query, source) {
    if (query.length === 0) {
      refs.body.style.background =
        "linear-gradient(#f5f5f500, #0a0505b3), url('/images/primary_bg.jpg') no-repeat center/cover fixed";
      return;
    }

    refs.body.style.background = `linear-gradient(#f5f5f500, #0a0505b3), ${source} no-repeat center/cover fixed`;
  },

  randomIndex: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
