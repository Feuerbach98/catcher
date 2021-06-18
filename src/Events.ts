export enum EVENTS {
    on_game_loaded_event = "on_game_loaded_event",
    on_preloader_loaded_event = "on_preloader_loaded_event",
    music_slider = "music_slider",
    sound_slider = "sound_slider",
    throw_error = "throw_error",
    error_ok_pressed = "error_ok_pressed",
    keydown = "keydown",
    sound_button_clicked = "sound_button_clicked",
    exit_button_pressed_event = "exit_button_pressed_event",
    on_continue = "on_continue",
}

for (const event of Object.values(EVENTS)) {
    document.addEventListener(event, (e) => {
        console.log(`Event "${event}" fired.`);
        if (e instanceof CustomEvent) {
            console.log(`Detail: `, e.detail);
        }
    });
}

/**
 * This functions returns promise that resolves when event is fired.
 * @param event_type Event to wait for.
 */
export function waitForEvent(event_type: EVENTS): Promise<any> {
    return new Promise((resolve) => {
        document.addEventListener(EVENTS[event_type], resolve, {
            once: true,
        });
    });
}
