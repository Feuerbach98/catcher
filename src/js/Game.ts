import * as PIXI from "pixi.js";
import {Guy} from "./Guy";

// import { CONFIG } from "./Config";

export class Game {
    app: PIXI.Application
    container: PIXI.Container;
    guy: Guy;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();

        this.guy = new Guy(this.app);
        this.container.addChild(this.guy.container);
    }
}
