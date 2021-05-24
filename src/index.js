if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(registration => {
    currentlyPlaying();
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
      cleanSearch();

      // SEARCH SONGS ARTISTS AND ALBUMS HERE
      let access_token = localStorage.getItem("access_token")
      console.log(access_token);
      let xhr = new XMLHttpRequest();
      xhr.open("GET", SEARCH + `?q=${toSearch}&type=track%2Cartist%2Calbum&market=US&limit=10&offset=5`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
      xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            data.artists.items.forEach(e => {
              showResultArtists(e)
            });
            data.albums.items.forEach(e => {
              showResultAlbums(e)
            });
            data.tracks.items.forEach(e => {
              showResultSongs(e)
            });
          }
          else {
            dump("Error loading page\n");
          }
        }
      };
      xhr.send(null);
    };
  }, 200);
};

document.getElementById('home-button').onclick = () => {
  console.log('SWITCH TO HOME!');
  switchTo('home');
};

// if (navigator.serviceWorker) {
//   window.addEventListener('load', () => {
//     currentlyPlaying();
//   });
// }
