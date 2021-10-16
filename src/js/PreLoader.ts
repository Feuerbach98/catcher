import * as PIXI from "pixi.js";
import { EVENTS } from "./Events";
import { SESSION_CONFIG } from "./SessionConfig";
import {CONFIG, GUYS_CONFIG, LOAD_THINGS_CONFIG} from "./Config";


export class Loader {
    app: PIXI.Application;
    container: PIXI.Container;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();

        this.getAssetsAddress();

        this.loadAssets()
            .then(this.gameLoaded);
    }

    getAssetsAddress = () => {
        const indexHtmlPath = `${window.location.origin}${window.location.pathname}`;
        const rootFolderPath = indexHtmlPath.replace("index.html", "");

        CONFIG.assetsAddress = `${rootFolderPath}assets/`;
    }

    loadAssets = () => {
        const result = PIXI.Loader.shared
            .add(
                "guy_left",
                `${CONFIG.assetsAddress}guy_left.png`
            )
            .add(
                "guy_right",
                `${CONFIG.assetsAddress}guy_right.png`
            )

        for (let i = 0; i < LOAD_THINGS_CONFIG.length; i++) {
            result.add(
                LOAD_THINGS_CONFIG[i],
                `${CONFIG.assetsAddress}drinks/${LOAD_THINGS_CONFIG[i]}.png`
            )
        }

        for (let i = 0; i < Object.keys(GUYS_CONFIG).length; i++) {
            //@ts-ignore
            const guy = GUYS_CONFIG[Object.keys(GUYS_CONFIG)[i]];
            result.add(
                `${guy.key}_right`,
                `${CONFIG.assetsAddress}guys/${guy.key}_right.png`
                )
                .add(
                    `${guy.key}_left`,
                    `${CONFIG.assetsAddress}guys/${guy.key}_left.png`
                )
        }

        return new Promise((resolve) => {
            result.load(() => {
                resolve(true);
            });
        });
    };

    gameLoaded = () => {
        document.dispatchEvent(new Event(EVENTS.game_loaded));
    };
}
