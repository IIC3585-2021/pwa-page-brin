if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration Failed");
        console.log(error);
    })
}

function showNotification() {
    const notification = new Notification("New message from Musicfy", {
        body: "Discover new artists, albums and songs!"
    })
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

document.getElementById("notify").onclick = showNotification;

const mainDiv = document.getElementById('full-container');

const apiUrl = 'https://api.spotify.com/v1/search';

const switchTo = (view) => {
  const toRemove = mainDiv.querySelector('div');
  toRemove.remove();

  const newElement = document.createElement('div');
  newElement.setAttribute('w3-include-html', `./${view}.html`);
  newElement.id = "html-container";
  mainDiv.insertBefore(newElement, document.getElementById('bottom-br'));
  includeHTML();
};


// My own little piece of callback hell
document.getElementById('search-button').onclick = () => {
  console.log('SWITCH TO SEARCH!');
  switchTo('search');

  setTimeout(() => {
    document.getElementById('accept-search-button').onclick = () => {
      const searchBar = document.getElementById('search-bar');
      const toSearch = searchBar.value;
      console.log(toSearch);

      // SEARCH SONGS ARTISTS AND ALBUMS HERE
    };
  }, 200);
};


// document.getElementById('home-button').onclick = () => {
//   console.log('SWITCH TO HOME!');
//   switchTo('home');
// };

// window.addEventListener('load', () => {
//   currentlyPlaying();
//   // document.getElementById('my-button').onclick = () => {
//   //   document.querySelector('content-display').setAttribute('title', 'Honorary Astronaut');
//   // };
// });
