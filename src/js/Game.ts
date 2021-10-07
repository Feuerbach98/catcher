import * as PIXI from "pixi.js";
import {Guy} from "./Guy";
import {Thing} from "./Thing";
import anime from "animejs";
import {EVENTS} from "./Events";
import {LogicState} from "./LogicState";
import {ThingTypes} from "./Models";
import {randomInteger} from "./Utils";

// import { CONFIG } from "./Config";

export class Game {
    app: PIXI.Application
    container: PIXI.Container;
    thingsContainer: PIXI.Container;
    guy: Guy;
    things: Thing[];
    timeout?: number;
    timeoutFn?: NodeJS.Timeout;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();
        this.thingsContainer = new PIXI.Container();

        this.things = [];
        this.timeout = 2000;

        this.guy = new Guy(this.app);
        this.container.addChild(this.guy.container);

        document.addEventListener(EVENTS.gameOver, this.destroyAll)

        this.createCycle();
    }

    createCycle = () => {
        if (LogicState.gameOver) {
            return;
        }
        this.timeoutFn = setTimeout(() => {
            this.addThing()
            this.createCycle();
        }, this.timeout)
        this.timeout = randomInteger(200, 2000);
    }

    destroyAll = () => {
        if (this.timeoutFn) {
            clearTimeout(this.timeoutFn);
        }

        this.things.forEach(thing => {
            anime({
                targets: [thing.sprite],
                duration: 100,
                alpha: 0,
                complete: () => {
                    thing.destroyed = true;
                    this.thingsContainer.removeChild(thing.container)
                }
            })
        })
    }

    addThing = () => {
        const drink = new Thing(this.app);
        this.things.push(drink);
        this.thingsContainer.addChild(drink.container);
        this.moveDrinks();
    }

    moveDrinks = () => {
        this.things.forEach((thing) => {
            if (thing.moving) {
                return
            }

            thing.moving = true;

            anime({
                targets: [thing.sprite!.position],
                duration: 2700,
                y: thing.sprite!.position.y + this.app.renderer.height / PIXI.settings.RESOLUTION,
                easing: "linear",
                update: () => {
                    if (thing.sprite!.position.y > this.app.renderer.height / PIXI.settings.RESOLUTION - 445 &&
                        thing.sprite!.position.y < this.app.renderer.height / PIXI.settings.RESOLUTION - 395 &&
                        this.guy.rotation === thing.side && !thing.destroyed
                    ) {
                        thing.destroyed = true;

                        anime({
                            targets: [thing.sprite],
                            duration: 100,
                            complete: () => {
                                this.thingsContainer.removeChild(thing.container)
                                if (thing.type === ThingTypes.main) {
                                    document.dispatchEvent(new Event(EVENTS.increaseScore));
                                }
                                if (thing.type === ThingTypes.lose) {
                                    document.dispatchEvent(new Event(EVENTS.decreaseHealth));
                                    document.dispatchEvent(new Event(EVENTS.decreaseHealth));
                                    document.dispatchEvent(new Event(EVENTS.decreaseHealth));
                                }
                                if (thing.type === ThingTypes.bonus) {
                                    if (LogicState.hurtsCount < 5) {
                                        document.dispatchEvent(new Event(EVENTS.increaseHealth));
                                    } else {
                                        document.dispatchEvent(new Event(EVENTS.increaseScore));
                                        document.dispatchEvent(new Event(EVENTS.increaseScore));
                                        document.dispatchEvent(new Event(EVENTS.increaseScore));
                                        document.dispatchEvent(new Event(EVENTS.increaseScore));
                                        document.dispatchEvent(new Event(EVENTS.increaseScore));
                                    }
                                }
                            },
                            alpha: 0
                        })
                    }
                },
                complete: () => {
                    if (!thing.destroyed) {
                        //lost
                        thing.destroyed = true;
                        if (thing.type === ThingTypes.main) {
                            document.dispatchEvent(new Event(EVENTS.decreaseHealth));
                        }
                        this.thingsContainer.removeChild(thing.container)
                    }
                }
            })
        })
    }
}
