import * as PIXI from "pixi.js";
import {LogicState} from "./LogicState";
import {getTexture} from "./Utils";
import {GUYS_CONFIG} from "./Config";
import {GuyConfig} from "./Models";
import {EVENTS} from "./Events";
import {saveToStorage, SESSION_CONFIG} from "./SessionConfig";

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
    textStyle: PIXI.TextStyle;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.bgContainer = new PIXI.Container();
        this.fgContainer = new PIXI.Container();
        this.sprites = [];

        this.textStyle = new PIXI.TextStyle({
            fill: "white",
            fontFamily: "Maler",
            fontSize: 45,
        })

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
        this.graphics.beginFill(0x303030);
        this.graphics.drawRect(0, 0, 720, 50);
        this.graphics.endFill()

        this.bgContainer.addChild(this.graphics);

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x303030);
        this.graphics.drawRect(0, this.app.renderer.height /  PIXI.settings.RESOLUTION - 50, 720, 50);
        this.graphics.endFill()

        this.bgContainer.addChild(this.graphics);

        const text = new PIXI.Text("Життя:", {
            ...this.textStyle,
            fontSize: 25,
        })
        text.anchor.set(0, 0.5);
        text.position.set(40, 1280 - 25);
        this.fgContainer.addChild(text);

        const text2 = new PIXI.Text("Очки:", this.textStyle)
        text2.anchor.set(0, 0.5);
        text2.position.set(15, 25);
        this.bgContainer.addChild(text2);

        this.score = new PIXI.Text("0", this.textStyle)
        this.score.anchor.set(0, 0.5);
        this.score.position.set(text2.position.x + text2.width + 10, 25);
        this.bgContainer.addChild(this.score);

        const guyConfig = GUYS_CONFIG[LogicState.currentGuy] as GuyConfig;

        for (let i = 0; i < LogicState.hurtsCount; i++) {
            const sprite = new PIXI.Sprite(getTexture(guyConfig.key + "_right"))
            sprite.scale.set(this.size.width / Math.max(sprite.width, sprite.height))
            sprite.anchor.set(0, 0.5);
            sprite.position.set(160 + i * 50, 1280 - 25);
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
            setTimeout(() => {
                document.dispatchEvent(new Event(EVENTS.gameOver));
            }, 2000)

            document.dispatchEvent(new Event(EVENTS.stopThings));
            LogicState.gameOver = true;
        }
    }

    increaseScore = () => {
        LogicState.score++;
        this.score!.text = LogicState.score.toString();

        if (SESSION_CONFIG.results[LogicState.currentGuy] === undefined ||
            SESSION_CONFIG.results[LogicState.currentGuy] === null
        ) {
            SESSION_CONFIG.results[LogicState.currentGuy] = 0;
        }

        SESSION_CONFIG.results[LogicState.currentGuy] += 1;
        saveToStorage();
    }

    increaseHealth = () => {
        LogicState.hurtsCount++;

        //@ts-ignore
        const guyConfig = GUYS_CONFIG[LogicState.currentGuy] as GuyConfig;

        this.fgContainer.removeChildren(1, this.fgContainer.children.length);

        for (let i = 0; i < LogicState.hurtsCount; i++) {
            const sprite = new PIXI.Sprite(getTexture(guyConfig.key + "_right"))
            sprite.scale.set(this.size.width / Math.max(sprite.width, sprite.height))
            sprite.anchor.set(0, 0.5);
            sprite.position.set(160 + i * 55, 1280 - 25);
            this.fgContainer.addChild(sprite);
            this.sprites.push(sprite);
        }
    }

    onResize = () => {
        if (this.graphics) {
            this.bgContainer.removeChild(this.graphics!);
        }

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x303030);
        this.graphics.drawRect(0, this.app.renderer.height /  PIXI.settings.RESOLUTION - 50, 720, 50);
        this.graphics.endFill()

        this.bgContainer.addChild(this.graphics);

        this.fgContainer.position.set(0, this.app.renderer.height / PIXI.settings.RESOLUTION - 1280)
    }
}
