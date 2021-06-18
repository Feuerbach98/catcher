import { Observer } from "./Observer";
import * as PIXI from "pixi.js";
import anime from "animejs";
import { AUDIO_MANAGER, SoundNames } from "./AudioManager";
import { LogicState } from "./LogicState";

export interface MousePosition {
    x: number;
    y: number;
}

export const enum ButtonStates {
    Active = "Active",
    Hovered = "Hovered",
    Pressed = "Pressed",
    Inactive = "Inactive",
    Hidden = "Hidden",
}

export class Button implements Observer {
    private current_anim?: anime.AnimeInstance;
    private scale = 1;
    sprite: PIXI.Sprite;
    state: ButtonStates = ButtonStates.Active;
    active_texture: PIXI.Texture;
    hover_texture?: PIXI.Texture;
    pressed_texture?: PIXI.Texture;
    inactive_texture?: PIXI.Texture;
    event?: Event | CustomEvent;
    canOpenOrCloseSomeWindow: boolean;
    on_state_update?: () => void;
    /**
     * "clickAll.mp3 by default"
     */
    sound_name: SoundNames = "click_sound";

    constructor(
        active_texture: PIXI.Texture,
        canOpenOrCloseSomeWindow = false
    ) {
        this.active_texture = active_texture;
        this.canOpenOrCloseSomeWindow = canOpenOrCloseSomeWindow;
        this.sprite = new PIXI.Sprite(active_texture);
        this.sprite.cursor = "pointer";
        this.sprite.interactive = true;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.on("pointerover", this.hover_event);
        this.sprite.on("pointerout", this.unhover_event);
        this.sprite.on("pointerdown", this.press_event);
        this.sprite.on("pointerup", this.unpress_event);
        this.sprite.on("pointerupoutside", this.unpress_event_outside);
    }

    set_width = (width: number) => {
        this.sprite.width = width;
        this.sprite.height = width;
        this.scale = this.sprite.scale.x;
    };

    set_scale = (scale: number) => {
        this.sprite.scale.set(scale);
        this.scale = scale;
    };

    hover_event = () => {
        if (this.state === ButtonStates.Active) {
            this.state = ButtonStates.Hovered;
            if (this.hover_texture) {
                this.sprite.texture = this.hover_texture;
            }
        }
    };

    unhover_event = () => {
        if (this.state === ButtonStates.Hovered) {
            this.state = ButtonStates.Active;
            this.sprite.texture = this.active_texture;
        }
    };

    press_event = () => {
        if (
            this.state === ButtonStates.Active ||
            this.state === ButtonStates.Hovered ||
            this.state === ButtonStates.Pressed
        ) {
            this.state = ButtonStates.Pressed;

            let sound;

            if (this.sound_name) {
                sound = AUDIO_MANAGER[this.sound_name];
            }

            if (sound) {
                sound.play();
            }

            if (this.pressed_texture) {
                this.sprite.texture = this.pressed_texture;
            }
            this.current_anim?.pause();

            this.current_anim = anime({
                targets: this.sprite.scale,
                x: this.scale * 0.96,
                y: this.scale * 0.96,
                easing: "linear",
                duration: 75,
            });
        }
    };

    unpress_event = () => {
        if (this.state === ButtonStates.Pressed) {
            this.state = this.canOpenOrCloseSomeWindow
                ? ButtonStates.Active
                : ButtonStates.Hovered;
            this.current_anim?.pause();
            this.current_anim = anime({
                targets: this.sprite.scale,
                x: this.scale,
                y: this.scale,
                easing: "linear",
                duration: 75,
                complete: () => {
                    this.sprite.texture =
                        !LogicState.is_mobile && !this.canOpenOrCloseSomeWindow
                            ? this.hover_texture || this.active_texture
                            : this.active_texture;
                },
            });

            if (this.event) {
                document.dispatchEvent(this.event);
            }
        }
    };

    unpress_event_outside = () => {
        if (this.state === ButtonStates.Pressed) {
            this.state = ButtonStates.Active;
            this.current_anim?.pause();
            this.current_anim = anime({
                targets: this.sprite.scale,
                x: this.scale,
                y: this.scale,
                easing: "linear",
                duration: 75,
                complete: () => {
                    this.sprite.texture = this.active_texture;
                },
            });
        }
    };

    activate_button = (point: MousePosition | undefined = undefined) => {
        let state = ButtonStates.Active;
        if (point) {
            if (
                point.y < this.sprite.position.y + this.sprite.height / 2 &&
                point.y > this.sprite.position.y - this.sprite.height / 2 &&
                point.x < this.sprite.position.x + this.sprite.width / 2 &&
                point.x > this.sprite.position.x - this.sprite.width / 2
            ) {
                state = ButtonStates.Hovered;
            }
        }
        this.state = state;
        this.sprite.visible = true;
        this.sprite.texture =
            state === ButtonStates.Active
                ? this.active_texture
                : this.hover_texture || this.active_texture;
        this.sprite.interactive = true;
        this.sprite.cursor = "pointer";
        this.sprite.scale.set(this.scale, this.scale);
    };

    inactivate_button = () => {
        this.current_anim?.pause();
        this.sprite.visible = true;
        this.state = ButtonStates.Inactive;
        if (this.inactive_texture) {
            this.current_anim = anime({
                targets: this.sprite.scale,
                x: this.scale,
                y: this.scale,
                easing: "linear",
                duration: 75,
                complete: () => {
                    this.sprite.texture = this.inactive_texture!;
                },
            });
        }
        this.sprite.interactive = false;
        this.sprite.cursor = "default";
    };

    hide_button = () => {
        this.current_anim?.pause();
        this.state = ButtonStates.Hidden;
        this.sprite.visible = false;
    };

    set_normal_texture = (tex: PIXI.Texture) => {
        this.active_texture = tex;
        this.sprite.texture = tex;
    };

    on_resize = () => {
        switch (this.state) {
            case ButtonStates.Active:
                this.sprite.texture = this.active_texture;
                break;

            case ButtonStates.Inactive:
                this.sprite.texture =
                    this.inactive_texture || this.active_texture;
                break;

            case ButtonStates.Hidden:
                this.hide_button();
                break;

            default:
                break;
        }
    };
}
