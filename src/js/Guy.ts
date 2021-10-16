import * as PIXI from "pixi.js";
import {GUYS_CONFIG} from "./Config";
import {LogicState} from "./LogicState";
import {GuyConfig, MainGuyTextureKeys} from "./Models";
import {getTexture} from "./Utils";

export class Guy {
    app: PIXI.Application
    container: PIXI.Container;
    sprite?: PIXI.Sprite;
    rotation?: "right" | "left";
    rightTexture?: PIXI.Texture;
    leftTexture?: PIXI.Texture;
    head?: PIXI.Sprite;
    width: number;
    height: number;
    guyConfig: GuyConfig;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();
        this.guyConfig = GUYS_CONFIG[LogicState.currentGuy] as GuyConfig;

        this.height = 250;
        this.width = 250;

        this.init();
        this.initEvents();
    }

    init = () => {
        this.rotation = "right";

        this.rightTexture = getTexture(MainGuyTextureKeys.guy_right);
        this.leftTexture = getTexture(MainGuyTextureKeys.guy_left);

        this.sprite = new PIXI.Sprite(this.rightTexture);
        this.sprite.anchor.set(0.25, 1);
        this.sprite.scale.set(1.4);

        this.container.addChild(this.sprite);
        this.sprite.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.sprite.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 70;
        this.addHead();
    }

    addHead = () => {
        this.head = new PIXI.Sprite(getTexture(this.guyConfig.key + "_right")) // right
        this.head.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.head.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 400 * this.sprite!.scale.x;
        this.head.anchor.set(0.5);

        this.head.scale.set(this.width / Math.max(this.head.width, this.head.height))

        this.container.addChild(this.head);
    }

    initEvents = () => {
        document.addEventListener("pointerdown", this.changeRotation);
        window.addEventListener("resize", this.onResize);
    }

    changeRotation = () => {
        if (this.rotation === "right") {
            this.rotation = "left";
            this.sprite!.texture = this.leftTexture!;
            this.sprite!.anchor.set(0.75, 1);

            this.head!.texture = getTexture(this.guyConfig.key + "_left");

            return
        }

        if (this.rotation === "left") {
            this.rotation = "right";
            this.sprite!.texture = this.rightTexture!;
            this.sprite!.anchor.set(0.25, 1);

            this.head!.texture = getTexture(this.guyConfig.key + "_right");

            return;
        }
    }

    onResize = () => {
        this.sprite!.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.sprite!.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 70;

        this.head!.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.head!.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 400 * this.sprite!.scale.x;
    }
}
