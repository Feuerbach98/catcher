import {DrinkTextureKeys, GuysTextureKeys, GuysTypes} from "./Models";

export const CONFIG = {
    shipSpeed: 3,
    inertia: 0.98,
    asteroidsCount: 5,
}

export const GUYS_CONFIG = {
    [GuysTypes.shepa]: {
        head: {
            right: GuysTextureKeys.shepa_right,
            left: GuysTextureKeys.shepa_left,
        },
        drinks: {
            main: DrinkTextureKeys.vakcina,
            bonus: DrinkTextureKeys.applehoney,
            lose: DrinkTextureKeys.medoff
        }
    }
}
