import refs from './refs';
import axios from 'axios';

const apiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';

export default {
  background: function (query) {
    axios
      .get(
        `https://pixabay.com/api?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&category=places+travel&per_page=3`,
      )
      .then(res => {
        const image = res.data.hits[0].largeImageURL;
        this.backgroundImage(query, `url('${image}')`);
      })
      .catch(error => console.log('not have image('));
  },

  backgroundImage: function (query, source) {
    if (query.length === 0) {
      refs.body.style.background =
        "linear-gradient(#f5f5f500, #0a0505b3), url('/images/primery_bg.jpg') no-repeat center/cover fixed";
      return;
    }

    refs.body.style.background = `linear-gradient(#f5f5f500, #0a0505b3), ${source} no-repeat center/cover fixed`;
  },
};
