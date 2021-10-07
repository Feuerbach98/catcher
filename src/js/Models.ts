export enum GuysTypes {
    shepa = "shepa",
}

export enum DrinkTextureKeys {
    vakcina = "vakcina",
    medoff = "medoff",
    applehoney = "applehoney"
}

export enum GuysTextureKeys {
    shepa_right = "shepa_right",
    shepa_left = "shepa_left",
}

export enum MainGuyTextureKeys {
    guy_right = "guy_right",
    guy_left= "guy_left",
}

export interface GuyConfig {
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
