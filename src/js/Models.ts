export enum GuysTypes {
    shepa = "shepa",
    shved = "shved",
}

export enum DrinkTextureKeys {
    vakcina = "vakcina",
    medoff = "medoff",
    applehoney = "applehoney"
}

export enum ThingTypes {
    main = "main",
    bonus = "bonus",
    lose = "lose"
}

export enum GuysTextureKeys {
    shepa_right = "shepa_right",
    shepa_left = "shepa_left",
    shved_right = "shved_right",
    shved_left = "shved_left",
}

export enum MainGuyTextureKeys {
    guy_right = "guy_right",
    guy_left= "guy_left",
}

export interface GuyConfig {
    name: string,
    key: string,
    head: {
        right: string,
        left: string,
    },
    drinks: {
        main: string,
        bonus: string,
        lose: string,
    }
}
