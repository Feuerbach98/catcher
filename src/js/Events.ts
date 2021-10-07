export const EVENTS = {
    game_loaded: "game_loaded",
    decreaseHealth: "decreaseHealth",
    increaseScore: "increaseScore",
    increaseHealth: "increaseHealth",
    gameOver: "gameOver",
}

Object.keys(EVENTS).forEach(key => {
    //@ts-ignore
    document.addEventListener((EVENTS[key]), () => {
        //@ts-ignore
        console.log(EVENTS[key] + " event fired!")
    })
});
