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
            main: DrinkTextureKeys.vakcina,
            bonus: DrinkTextureKeys.applehoney,
            lose: DrinkTextureKeys.medoff
        }
    },
    "lalala": {
        name: "Шепа",
        key: "lalala",
        drinks: {
            main: DrinkTextureKeys.vakcina,
            bonus: DrinkTextureKeys.applehoney,
            lose: DrinkTextureKeys.medoff
        }
    },
    "lalala2": {
        name: "Шепа",
        key: "lalala2",
        drinks: {
            main: DrinkTextureKeys.vakcina,
            bonus: DrinkTextureKeys.applehoney,
            lose: DrinkTextureKeys.medoff
        }
    },
    "lalala3": {
        name: "Шепа",
        key: "lalala3",
        drinks: {
            main: DrinkTextureKeys.vakcina,
            bonus: DrinkTextureKeys.applehoney,
            lose: DrinkTextureKeys.medoff
        }
    },
}

export const LOAD_THINGS_CONFIG = [
    "vakcina",
    "applehoney",
    "medoff"
]
