import * as PIXI from "pixi.js";
import { EVENTS } from "./Events";
import { Game } from "./Game";
import { Loader } from "./PreLoader";
import { InfoPanel } from "./InfoPanel";
import {initLogicState, LogicState, resetLogicState} from "./LogicState";
import {initSESSION_CONFIG} from "./SessionConfig";

export class App {
    canvas: HTMLCanvasElement;
    app: PIXI.Application;
    loader?: Loader;
    game?: Game;
    infoPanel?: InfoPanel;

    constructor() {
        this.canvas = document.getElementById("scene") as HTMLCanvasElement;

        initSESSION_CONFIG();

        this.app = this.getPixiApp();
        this.setupEvents();
        this.loadLoader();
        this.onResize();
    }

    getPixiApp = () => {
        PIXI.settings.RESOLUTION = window.devicePixelRatio;

        return new PIXI.Application({
            width: 720,
            height: 1280,
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
        resetLogicState();

        this.game = new Game(this.app);
        this.infoPanel = new InfoPanel(this.app);
        this.app.stage.addChild(this.game.thingsContainer);
        this.app.stage.addChild(this.infoPanel.bgContainer);
        this.app.stage.addChild(this.infoPanel.fgContainer);
        this.app.stage.addChild(this.game.container);
    };

    setupEvents = () => {
        document.addEventListener(
            EVENTS.startGame,
            this.onGameLoaded
        );

        document.addEventListener(
            EVENTS.gameOver,
            this.onGameOver
        );

        document.addEventListener(
            EVENTS.endGame,
            this.onGameOver
        )

        window.addEventListener(
            "resize",
            this.onResize
        )
    };

    onGameOver = () => {
        this.app.stage.removeChildren(0, this.app.stage.children.length);
    }

    onResize = () => {
        const style = this.canvas.style;
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;

        style.width = `${width}px`;
        style.height = `${height}px`;
        style.marginTop = `0`;
        style.marginLeft = `0`;

        const renderer_height = (720 / width) * height;

        this.app.renderer.resize(720, renderer_height);
    }
}
