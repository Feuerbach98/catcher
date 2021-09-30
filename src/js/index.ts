import { App } from "./App";

function init() {
    document.title = "Asteroids";

    new App();
}

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
