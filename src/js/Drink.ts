import * as PIXI from "pixi.js";
import anime from "animejs";

export class Drink {
    app: PIXI.Application
    container: PIXI.Container;
    sprite?: PIXI.Sprite;
    width: number;
    height: number;
    side?: "left" | "right";

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();

        this.height = 150;
        this.width = 150;

        this.addDrink();
    }

    addDrink = (side?: "left" | "right") => {
        const sides = ["left", "right"];
        this.side = sides[Math.round(Math.random())] as "left" | "right";

        this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["vakcina"].texture);
        this.container.addChild(this.sprite);

        this.sprite.scale.set(this.width / Math.max(this.sprite.width, this.sprite.height))

        this.sprite.anchor.set(0.5, 1);

        this.sprite.y = 0;

        if (this.side === "left") {
            this.sprite.position.x = 150;
        } else {
            this.sprite.position.x = 720 - 150;
        }
    }
}
