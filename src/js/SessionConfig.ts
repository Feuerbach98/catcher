import {GUYS_CONFIG} from "./Config";

export let SESSION_CONFIG = {
    results: {} as any,
}

const key = "x76zNahVLKGRKUaO";

export function initSESSION_CONFIG() {
    const config = localStorage.getItem(key);

    if (config) {
        SESSION_CONFIG = JSON.parse(config);
    } else {
        //@ts-ignore
        SESSION_CONFIG.results = {}
        for (let i = 0; i < Object.keys(GUYS_CONFIG).length; i++) {
            //@ts-ignore
            const guy = GUYS_CONFIG[Object.keys(GUYS_CONFIG)[i]];
            //@ts-ignore
            SESSION_CONFIG.results[guy.key] = 0
        }
        saveToStorage();
    }
}

export function saveToStorage() {
    localStorage.setItem(key, JSON.stringify(SESSION_CONFIG));
}
