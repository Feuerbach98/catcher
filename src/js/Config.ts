import {DrinkTextureKeys, GuysTypes} from "./Models";

export const CONFIG = {
    assetsAddress: "",
    reel: [
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "main",
        "lose",
        "lose",
        "lose",
        "lose",
        "lose",
        "bonus",
    ]
}

export const GUYS_CONFIG = {
    [GuysTypes.shepa]: {
        name: "Шепа",
        key: GuysTypes.shepa,
        drinks: {
            main: DrinkTextureKeys.vakcina,
            bonus: DrinkTextureKeys.applehoney,
            lose: DrinkTextureKeys.medoff
        }
    },
    [GuysTypes.shved]: {
        name: "Швєд",
        key: GuysTypes.shved,
        drinks: {
            main: DrinkTextureKeys.samogon,
            bonus: DrinkTextureKeys.pepper,
            lose: DrinkTextureKeys.porshe
        }
    },
    [GuysTypes.semen]: {
        name: "Семен",
        key: GuysTypes.semen,
        drinks: {
            main: DrinkTextureKeys.jack,
            bonus: DrinkTextureKeys.doroga,
            lose: DrinkTextureKeys.vakcina
        }
    },
    [GuysTypes.roma]: {
        name: "Роман",
        key: GuysTypes.roma,
        drinks: {
            main: DrinkTextureKeys.jack,
            bonus: DrinkTextureKeys.doroga,
            lose: DrinkTextureKeys.vakcina
        }
    },
}

export const LOAD_THINGS_CONFIG = [
    "vakcina",
    "applehoney",
    "medoff",
    "doroga",
    "jack",
    "pepper",
    "porshe",
    "samogon"
]
