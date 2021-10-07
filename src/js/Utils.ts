import * as PIXI from "pixi.js";

export function getTexture(key: string) {
    return PIXI.Loader.shared.resources[key].texture;
}

export function randomInteger(min: number, max: number) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
