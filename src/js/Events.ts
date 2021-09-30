export const EVENTS = {
    game_loaded: "game_loaded",
}

Object.keys(EVENTS).forEach(key => {
    //@ts-ignore
    console.log(EVENTS[key]);
    //@ts-ignore
    document.addEventListener((EVENTS[key]), () => {
        //@ts-ignore
        console.log(EVENTS[key] + " event fired!")
    })
});
