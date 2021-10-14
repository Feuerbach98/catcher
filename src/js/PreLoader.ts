import * as PIXI from "pixi.js";
import { EVENTS } from "./Events";
import { SESSION_CONFIG } from "./SessionConfig";
import {CONFIG, GUYS_CONFIG} from "./Config";


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
        // drinks
            .add(
                "vakcina",
                `${CONFIG.assetsAddress}drinks/vakcina.png`
            )
            .add(
                "applehoney",
                `${CONFIG.assetsAddress}drinks/applehoney.png`
            )
            .add(
                "medoff",
                `${CONFIG.assetsAddress}drinks/medoff.png`
            )
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
