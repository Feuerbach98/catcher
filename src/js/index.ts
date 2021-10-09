import { App } from "./App";
import {htmlUIController} from "./htmlUIController";

function init() {
    document.title = "Alcohol catcher";

    new App();
    new htmlUIController();
}

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
