import { Subject } from "./Observer";

declare const __ENVIRONMENT__: string;

export enum AppState {
    pre_pre_loader = "pre_pre_loader",
    pre_loader = "pre_loader",
    game = "game",
}

export class LogicStateClass extends Subject {
    is_error = false;

    is_audio_enabled = true;
    is_mobile = false;
    is_portrait = true;

    private _app_state = AppState.pre_pre_loader;

    error: string | null = null;

    sound_button_pressed = false;
    are_sound_fx_on = true;
    sound_fx_volume = 1;
    is_music_on = true;
    music_volume = 1;

    updateState = (state: any) => {
        console.log(state);
    };

    get app_state() {
        return this._app_state;
    }

    set app_state(new_state: AppState) {
        this._app_state = new_state;
        this.notify_all();
    }
}

export const LogicState = new LogicStateClass();

export const change_app_state = (new_state: AppState) => {
    LogicState.app_state = new_state;
};
