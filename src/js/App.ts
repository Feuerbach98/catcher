import * as PIXI from "pixi.js";
import { EVENTS } from "./Events";
import { Game } from "./Game";
import { Loader } from "./PreLoader";

export class App {
    canvas: HTMLCanvasElement;
    app: PIXI.Application;
    loader?: Loader;
    game?: Game;

    constructor() {
        this.canvas = document.getElementById("scene") as HTMLCanvasElement;
        this.app = this.getPixiApp();
        this.setupEvents();
        this.loadLoader();
        this.onResize();
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
        this.loader = new Loader(this.app);
    };

    onGameLoaded = () => {
        this.game = new Game(this.app);
        this.app.stage.addChild(this.game.container);
    };

    setupEvents = () => {
        document.addEventListener(
            EVENTS.game_loaded,
            this.onGameLoaded
        );

        window.addEventListener(
            "resize",
            this.onResize
        )
    };

    onResize = () => {
        this.app.renderer.resize(window.innerWidth, window.innerHeight)
    }
}
