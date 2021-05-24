const mainDiv = document.getElementById('full-container');

const switchTo = (view) => {
  const toRemove = mainDiv.querySelector('div');
  toRemove.remove();

  const newElement = document.createElement('div');
  newElement.setAttribute('w3-include-html', `./${view}.html`);
  newElement.id = "html-container";
  mainDiv.insertBefore(newElement, document.getElementById('bottom-br'));
  includeHTML();
};

document.getElementById('search-button').onclick = () => {
  console.log('SWITCH TO SEARCH!');
  switchTo('search');
};

document.getElementById('home-button').onclick = () => {
  console.log('SWITCH TO HOME!');
  switchTo('home');
};

window.addEventListener('load', () => {
  currentlyPlaying();
  // document.getElementById('my-button').onclick = () => {
  //   document.querySelector('content-display').setAttribute('title', 'Honorary Astronaut');
  // };
});
