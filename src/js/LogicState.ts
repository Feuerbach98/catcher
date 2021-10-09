import {GuysTypes} from "./Models";

export let LogicState = {
    currentGuy: GuysTypes.shepa,
    hurtsCount: 10,
    gameOver: false,
    score: 0,
}

export const initLogicState = {
    hurtsCount: 10,
    gameOver: false,
    score: 0,
}

export function resetLogicState() {
    LogicState = {
        ...LogicState,
        ...initLogicState
    }
}
