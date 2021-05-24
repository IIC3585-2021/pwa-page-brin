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
    const notification = new Notification("New message from Spoofy", {
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

// document.getElementById('search-button').onclick = () => {
//   console.log('SWITCH TO SEARCH!');
//   switchTo('search');
// };

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
