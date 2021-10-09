import * as PIXI from "pixi.js";
import anime from "animejs";
import {getTexture, randomInteger} from "./Utils";
import {GuyConfig, GuysTypes, ThingTypes} from "./Models";
import {CONFIG, GUYS_CONFIG} from "./Config";
import {LogicState} from "./LogicState";

export class Thing {
    app: PIXI.Application
    container: PIXI.Container;
    sprite?: PIXI.Sprite;
    width: number;
    height: number;
    side?: "left" | "right";
    moving: boolean;
    destroyed: boolean;
    type?: ThingTypes;
    guyConfig: GuyConfig;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();
        this.moving = false;
        this.destroyed = false;
        //@ts-ignore
        this.guyConfig = GUYS_CONFIG[LogicState.currentGuy] as GuyConfig;

        this.height = 150;
        this.width = 150;

        this.addThing();
    }

    chooseTypeThing = () => {
        this.type = CONFIG.reel[randomInteger(0, CONFIG.reel.length - 1)] as ThingTypes;
    }

    addThing = (side?: "left" | "right") => {
        const sides = ["left", "right"];
        this.side = sides[Math.round(Math.random())] as "left" | "right";

        this.chooseTypeThing()

        this.sprite = new PIXI.Sprite(getTexture(this.guyConfig.drinks[this.type!]));
        this.container.addChild(this.sprite);

        this.sprite.scale.set(this.width / Math.max(this.sprite.width, this.sprite.height))

        this.sprite.anchor.set(0.5, 1);

        this.sprite.y = 0;

        const offset = 50;

        if (this.side === "left") {
            this.sprite.position.x = randomInteger(150 - offset, 150 + offset);
        } else {
            this.sprite.position.x = randomInteger(720 - 150 - offset, 720 - 150 + offset);
        }
    }
}
