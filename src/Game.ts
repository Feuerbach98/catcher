import { LogicState } from "./LogicState";

export class Game {
    readonly container: PIXI.Container;
    private readonly app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this.app = app;

        this.container = new PIXI.Container();
        this.draw_game();
        this.add_event_listeners();

        this.on_resize();

        this.container.interactive = true;
    }

    draw_game = () => {
        //
    };

    add_event_listeners = () => {
        window.addEventListener("resize", this.on_resize);
        window.addEventListener("orientationchange", this.on_resize);
    };

    on_resize = () => {
        LogicState.notify_all();
    };
}
