import * as PIXI from "pixi.js";
import {LogicState} from "./LogicState";
import {getTexture} from "./Utils";
import {GUYS_CONFIG} from "./Config";
import {GuyConfig} from "./Models";
import {EVENTS} from "./Events";

export class InfoPanel {
    app: PIXI.Application
    bgContainer: PIXI.Container;
    fgContainer: PIXI.Container;
    graphics?: PIXI.Graphics;
    sprites: PIXI.Sprite[];
    size: any = {
        width: 40,
        height: 40
    }
    score?: PIXI.Text;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.bgContainer = new PIXI.Container();
        this.fgContainer = new PIXI.Container();
        this.sprites = [];

        this.start();

        window.addEventListener(
            "resize",
            this.onResize
        )

        document.addEventListener(
            EVENTS.decreaseHealth,
            this.decreaseHealth
        )

        document.addEventListener(
            EVENTS.increaseScore,
            this.increaseScore
        )

        document.addEventListener(
            EVENTS.increaseHealth,
            this.increaseHealth
        )
    }

    start = () => {
        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0xACBBFE);
        this.graphics.drawRect(0, 0, 720, 50);
        this.graphics.endFill()

        this.bgContainer.addChild(this.graphics);

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0xACBBFE);
        this.graphics.drawRect(0, this.app.renderer.height /  PIXI.settings.RESOLUTION - 50, 720, 50);
        this.graphics.endFill()

        this.bgContainer.addChild(this.graphics);

        const text = new PIXI.Text("Health:")
        text.anchor.set(0, 0.5);
        text.position.set(15, 1280 - 25);
        this.fgContainer.addChild(text);

        const text2 = new PIXI.Text("Score:")
        text2.anchor.set(0, 0.5);
        text2.position.set(15, 25);
        this.bgContainer.addChild(text2);

        this.score = new PIXI.Text("0")
        this.score.anchor.set(0, 0.5);
        this.score.position.set(text2.position.x + text2.width + 10, 25);
        this.bgContainer.addChild(this.score);


        const guyConfig = GUYS_CONFIG[LogicState.currentGuy] as GuyConfig;

        for (let i = 0; i < LogicState.hurtsCount; i++) {
            const sprite = new PIXI.Sprite(getTexture(guyConfig.head.right))
            sprite.scale.set(this.size.width / Math.max(sprite.width, sprite.height))
            sprite.anchor.set(0, 0.5);
            sprite.position.set(120 + i * 55, 1280 - 25);
            this.fgContainer.addChild(sprite);
            this.sprites.push(sprite);
        }

        this.onResize();
    }



    decreaseHealth = () => {
        if (!this.sprites.length) {
            return;
        }
        this.fgContainer.removeChild(this.sprites[this.sprites.length - 1]);
        this.sprites.length = this.sprites.length - 1;
        LogicState.hurtsCount--;

        console.log("Health: ",LogicState.hurtsCount);

        if (!LogicState.hurtsCount) {
            document.dispatchEvent(new Event(EVENTS.gameOver));
            LogicState.gameOver = true;
        }
    }

    increaseScore = () => {
        LogicState.score++;
        this.score!.text = LogicState.score.toString();
    }

    increaseHealth = () => {
        LogicState.hurtsCount++;

        const guyConfig = GUYS_CONFIG[LogicState.currentGuy] as GuyConfig;

        this.fgContainer.removeChildren(1, this.fgContainer.children.length);

        for (let i = 0; i < LogicState.hurtsCount; i++) {
            const sprite = new PIXI.Sprite(getTexture(guyConfig.head.right))
            sprite.scale.set(this.size.width / Math.max(sprite.width, sprite.height))
            sprite.anchor.set(0, 0.5);
            sprite.position.set(120 + i * 55, 1280 - 25);
            this.fgContainer.addChild(sprite);
            this.sprites.push(sprite);
        }
    }

    onResize = () => {
        if (this.graphics) {
            this.bgContainer.removeChild(this.graphics!);
        }

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0xACBBFE);
        this.graphics.drawRect(0, this.app.renderer.height /  PIXI.settings.RESOLUTION - 50, 720, 50);
        this.graphics.endFill()

        this.bgContainer.addChild(this.graphics);

        this.fgContainer.position.set(0, this.app.renderer.height / PIXI.settings.RESOLUTION - 1280)
    }
}
