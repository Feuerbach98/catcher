import { Howl, Howler } from "howler";

class AudioManager {
    MUSIC: Howl[] = [];
    SOUND_FXS: Howl[] = [];

    WIN_SOUNDS: Howl[] = [];

    click_sound?: Howl;
    spin_sound?: Howl;
    bg_music?: Howl;
    bonus_bg_music?: Howl;
    expanding?: Howl;
    expandingAfter?: Howl;
    coin?: Howl;
    freespinout?: Howl;
    spinning?: Howl;
    stopSpin?: Howl;
    scatter1?: Howl;
    scatter2?: Howl;
    scatter3?: Howl;
    anticipation?: Howl;
    anticipation_instance?: number;
    freespinIn?: Howl;
    expandingChoose?: Howl;
    expandingStop?: Howl;
    big_win_nice?: Howl;
    big_win_big?: Howl;
    big_win_huge?: Howl;
    big_win_monster?: Howl;
    big_win_mega?: Howl;
    big_win_transition?: Howl;

    constructor() {
        // document.body.addEventListener("pointerdown", this.init, {
        //     once: true,
        // });
        // console.log("Audio manager created.");
    }

    init = () => {
        //
    };

    change_fx_volume = (new_volume: number) => {
        for (const fx of this.SOUND_FXS) {
            fx.volume(new_volume);
        }
    };

    change_music_volume = (new_volume: number) => {
        for (const m of this.MUSIC) {
            m.volume(new_volume);
        }
    };

    play_win_sound = () => {
        const index = Math.floor(Math.random() * 7);
        this.WIN_SOUNDS[index].play();
    };

    play_anticipation = () => {
        if (!this.anticipation_instance) {
            this.anticipation_instance = this.anticipation?.play();
        }
    };

    stop_anticipation = () => {
        this.anticipation?.stop();
        this.anticipation_instance = undefined;
    };
}

export type SoundNames = "click_sound" | "spin_sound";

export const AUDIO_MANAGER = new AudioManager();

window.addEventListener("blur", () => {
    Howler.mute(true);
});

window.addEventListener("focus", () => {
    Howler.mute(false);
});

window.addEventListener("pagehide", () => {
    Howler.mute(true);
});

window.addEventListener("pageshow", () => {
    Howler.mute(false);
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        Howler.mute(false);
    } else {
        Howler.mute(true);
    }
});
