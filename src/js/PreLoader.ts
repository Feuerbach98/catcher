import * as PIXI from "pixi.js";
import { EVENTS } from "./Events";
import { SESSION_CONFIG } from "./SessionConfig";


export class Loader {
    app: PIXI.Application;
    container: PIXI.Container;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();

        this.getAssetsAddress();

        this.loadAssets()
            .then(this.gameLoaded);
    }

    getAssetsAddress = () => {
        const indexHtmlPath = `${window.location.origin}${window.location.pathname}`;
        const rootFolderPath = indexHtmlPath.replace("index.html", "");

        SESSION_CONFIG.assetsAddress = `${rootFolderPath}assets/`;
    }

    loadAssets = () => {
        const result = PIXI.Loader.shared
            // .add(
            //     "asteroid",
            //     `${SESSION_CONFIG.assetsAddress}asteroid.png`
            // )

        return new Promise((resolve) => {
            result.load(() => {
                resolve(true);
            });
        });
    };

    gameLoaded = () => {
        document.dispatchEvent(new Event(EVENTS.game_loaded));
    };
}
