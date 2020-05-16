import citations from './json/citation.json';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const randomCitation = citations[random(0, citations.length - 1)];
const authorName = Object.keys(randomCitation);
const citationText = Object.values(randomCitation);

window.addEventListener('load', () => {
  document
    .querySelector('.citation__text')
    .insertAdjacentText('afterbegin', citationText);
  document
    .querySelector('.citation__author')
    .insertAdjacentText('afterbegin', authorName);
});
