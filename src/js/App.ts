import * as PIXI from "pixi.js";
import { EVENTS } from "./Events";
import { Game } from "./Game";
import { Loader } from "./PreLoader";

export class App {
    canvas: HTMLCanvasElement;
    app: PIXI.Application;
    loader?: PIXI.Loader;
    game?: Game;

    constructor() {
        this.canvas = document.getElementById("scene") as HTMLCanvasElement;
        this.app = this.getPixiApp();
        this.setupEvents();
        this.loadLoader();
    }

    getPixiApp = () => {
        PIXI.settings.RESOLUTION = window.devicePixelRatio;

        return new PIXI.Application({
            width: 1280,
            height: 720,
            view: this.canvas,
            sharedLoader: true,
            sharedTicker: true,
            transparent: true,
        });
    };

    loadLoader = () => {
        this.loader = new PIXI.Loader() as PIXI.Loader;
    };

    onGameLoaded = () => {
        console.log("Game loaded!")
        this.game = new Game(this.app);
        this.app.stage.addChild(this.game.container);
    };

    setupEvents = () => {
        document.addEventListener(
            EVENTS.game_loaded,
            this.onGameLoaded
        );
    };
}
