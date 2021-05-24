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