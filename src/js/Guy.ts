import * as PIXI from "pixi.js";

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

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();

        this.height = 250;
        this.width = 250;

        this.init();
        this.initEvents();
    }

    init = () => {
        this.rotation = "right";

        this.rightTexture = PIXI.Loader.shared.resources["guy_right"].texture;
        this.leftTexture = PIXI.Loader.shared.resources["guy_left"].texture;

        this.sprite = new PIXI.Sprite(this.rightTexture);
        this.sprite.anchor.set(0.25, 1);
        this.sprite.scale.set(1.4);

        this.container.addChild(this.sprite);
        this.sprite.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.sprite.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 20;
        this.addHead();
    }

    addHead = () => {
        this.head = new PIXI.Sprite(PIXI.Loader.shared.resources["shepa_right"].texture)
        this.head.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.head.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 350 * this.sprite!.scale.x;
        this.head.anchor.set(0.5);

        this.head.scale.set(this.width / Math.max(this.head.width, this.head.height))

        this.container.addChild(this.head);
    }

    initEvents = () => {
        document.addEventListener("pointerdown", this.changeRotation);
        window.addEventListener("resize", this.onResize);
    }

    changeRotation = () => {
        console.log("change rotation");

        if (this.rotation === "right") {
            console.log("to left");
            this.rotation = "left";
            this.sprite!.texture = this.leftTexture!;
            this.sprite!.anchor.set(0.75, 1);

            this.head!.texture = PIXI.Loader.shared.resources["shepa_left"].texture;

            return
        }

        if (this.rotation === "left") {
            console.log("to right");
            this.rotation = "right";
            this.sprite!.texture = this.rightTexture!;
            this.sprite!.anchor.set(0.25, 1);

            this.head!.texture = PIXI.Loader.shared.resources["shepa_right"].texture;

            return;
        }
    }

    onResize = () => {
        this.sprite!.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.sprite!.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 20;

        this.head!.x = this.app.renderer.width / PIXI.settings.RESOLUTION / 2;
        this.head!.y = this.app.renderer.height /  PIXI.settings.RESOLUTION - 350 * this.sprite!.scale.x;
    }
}
