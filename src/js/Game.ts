import * as PIXI from "pixi.js";
import {Guy} from "./Guy";
import {Drink} from "./Drink";
import anime from "animejs";

// import { CONFIG } from "./Config";

export class Game {
    app: PIXI.Application
    container: PIXI.Container;
    bottlesContainer: PIXI.Container;
    guy: Guy;
    drinks: Drink[];
    timeout?: number

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();
        this.bottlesContainer = new PIXI.Container();

        this.drinks = [];
        this.timeout = 2000;

        this.guy = new Guy(this.app);
        this.container.addChild(this.guy.container);


        this.createCycle();
    }

    createCycle = () => {
        setTimeout(() => {
            this.addDrink()
            this.createCycle();
        }, this.timeout)
        this.timeout = Math.round(Math.random() * 2000);
    }

    addDrink = () => {
        const drink = new Drink(this.app);
        this.drinks.push(drink);
        this.bottlesContainer.addChild(drink.container);
        this.moveDrinks();
    }

    moveDrinks = () => {
        // console.log(this.drinks.length);
        this.drinks.forEach((drink) => {
            anime({
                targets: [drink.sprite!.position],
                duration: 3000,
                y: drink.sprite!.position.y + this.app.renderer.height / PIXI.settings.RESOLUTION,
                easing: "linear",
                update: () => {
                    if (drink.sprite!.position.y > this.app.renderer.height / PIXI.settings.RESOLUTION - 395 &&
                        drink.sprite!.position.y < this.app.renderer.height / PIXI.settings.RESOLUTION - 345 &&
                        this.guy.rotation === drink.side
                    ) {
                        anime({
                            targets: [drink.sprite],
                            duration: 100,
                            alpha: 0,
                            complete: () => {
                                this.bottlesContainer.removeChild(drink.container)
                            }
                        })
                    }
                }
            })
        })
    }
}
