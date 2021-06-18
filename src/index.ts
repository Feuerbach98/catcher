import "pixi-spine";
import { version } from "../package.json";
import { App } from "./App";
import { Config } from "./Config";

declare const __ENVIRONMENT__: string;

function init() {
    const game_name = "Manchkin online";
    const full_game_name = `${game_name}, version: ${version}`;

    Config.full_game_name = full_game_name;
    Config.game_name = game_name;
    document.title = full_game_name;

    new App();
}

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
