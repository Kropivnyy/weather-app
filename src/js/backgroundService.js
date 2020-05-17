import refs from './refs';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';

export default {
  background: function (query) {
    axios
      .get(
        `?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&category=places+travel&per_page=3`,
      )
      .then(res => {
        const image = res.data.hits[0].largeImageURL;
        this.backgroundImage(query, `url('${image}')`);
      })
      .catch(error => console.log(error));
  },

  backgroundImage: function (query, source) {
    const defaultBgImage =
      'https://pixabay.com/get/53e1d04a4d53ad14f6da8c7dda793678143ad7e454586c48702772d1914bcc5dbc_1280.jpg';

    if (query.length === 0) {
      refs.body.style.backgroundImage = `url('${defaultBgImage}')`;
      return;
    }

    refs.body.style.backgroundImage = source;
  },
};
