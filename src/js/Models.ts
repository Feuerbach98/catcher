export enum GuysTypes {
    shepa = "shepa",
    shved = "shved",
    semen = "semen",
    roma = "roma",
}

export enum DrinkTextureKeys {
    vakcina = "vakcina",
    medoff = "medoff",
    applehoney = "applehoney",
    doroga = "doroga",
    jack = "jack",
    pepper = "pepper",
    porshe = "porshe",
    samogon = "samogon"
}

export enum ThingTypes {
    main = "main",
    bonus = "bonus",
    lose = "lose"
}

export enum MainGuyTextureKeys {
    guy_right = "guy_right",
    guy_left= "guy_left",
}

export interface GuyConfig {
    name: string,
    key: string,
    drinks: {
        main: string,
        bonus: string,
        lose: string,
    }
}
