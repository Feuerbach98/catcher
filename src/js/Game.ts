import * as PIXI from "pixi.js";

// import { CONFIG } from "./Config";

export class Game {
    app: PIXI.Application
    container: PIXI.Container;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();

        // PIXI.Ticker.shared.add();
    }
}
