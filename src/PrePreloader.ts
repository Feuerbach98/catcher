import FontFaceObserver from "fontfaceobserver";
import { EVENTS } from "./Events";
import { FONTS } from "./Assets";
export class PrePreloader {
    readonly container: PIXI.Container;
    private readonly app: PIXI.Application;
    private loading_icon?: PIXI.Graphics;
    on_preloader_loaded_event: Event;

    constructor(app: PIXI.Application, on_preloader_loaded_event: Event) {
        this.app = app;
        this.on_preloader_loaded_event = on_preloader_loaded_event;
        this.container = new PIXI.Container();

        window.addEventListener("resize", this.on_resize);
        window.addEventListener("orientationchange", this.on_resize);
    }

    load_assets = () => {
        const result = PIXI.Loader.shared;

        const assets_loaded_promise = new Promise<void>((resolve) => {
            result.load(() => {
                resolve();
            });
        });

        const newStyle = document.createElement("style");

        for (const font of FONTS) {
            newStyle.appendChild(
                document.createTextNode(
                    `@font-face { 
    font-family: "${font}";
    src: url("./assets/fonts/${font}.woff2") format("woff2");
}`
                )
            );
        }

        document.head.appendChild(newStyle);

        const assets_promises = [assets_loaded_promise];

        for (const f of FONTS) {
            const font = new FontFaceObserver(f);
            const font_promise = font.load(null, 100000);
            assets_promises.push(font_promise);
        }

        return Promise.all(assets_promises);
    };

    switch_to_preloader = () => {
        document.dispatchEvent(new Event(EVENTS.on_preloader_loaded_event));
    };

    on_resize = () => {};
}
