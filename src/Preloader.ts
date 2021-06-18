import { LogicState } from "./LogicState";
import { ATLASES, ASSETS } from "./Assets";

export class Preloader {
    readonly container: PIXI.Container;
    private readonly app: PIXI.Application;
    private bg?: PIXI.Sprite;
    on_game_loaded_event: Event;
    loader_mask = new PIXI.Graphics();
    loader_width = 0;
    loader_height = 0;
    gj?: PIXI.Sprite;
    logo?: PIXI.Sprite;

    slider_fg?: PIXI.Sprite;
    slider_bg?: PIXI.Sprite;

    constructor(app: PIXI.Application, on_game_loaded_event: Event) {
        this.app = app;
        this.on_game_loaded_event = on_game_loaded_event;
        this.container = new PIXI.Container();
        this.draw_loader();
        this.load_assets();

        window.addEventListener("resize", this.on_resize);
        window.addEventListener("orientationchange", this.on_resize);

        this.on_resize();
    }

    draw_loader = () => {
        this.bg = new PIXI.Sprite(
            PIXI.Loader.shared.resources["bg_loading"].texture
        );
        this.container.addChild(this.bg);

        this.logo = new PIXI.Sprite(
            PIXI.Loader.shared.resources["logo"].texture
        );
        this.container.addChild(this.logo);

        this.slider_bg = new PIXI.Sprite(
            PIXI.Loader.shared.resources["load_bar_bg"].texture
        );
        this.container.addChild(this.slider_bg);

        this.slider_fg = new PIXI.Sprite(
            PIXI.Loader.shared.resources["load_bar_fg"].texture
        );

        this.gj = new PIXI.Sprite(
            PIXI.Loader.shared.resources["green_jade"].texture
        );
        this.container.addChild(this.gj);

        this.container.addChild(this.slider_fg);
        this.loader_width = this.slider_fg.width;
        this.loader_height = this.slider_fg.height;

        this.loader_mask.beginFill(0x000000);
        this.loader_mask.drawRect(0, 0, 0, 0);
        this.loader_mask.endFill();
        this.slider_fg.addChild(this.loader_mask);
        this.slider_fg.mask = this.loader_mask;
    };

    update_mask = (progress: number) => {
        this.loader_mask.clear();
        this.loader_mask.beginFill(0x000000);
        this.loader_mask.drawRect(
            0,
            0,
            this.loader_width * progress,
            this.loader_height
        );
        this.loader_mask.endFill();
    };

    load_assets = () => {
        let result = PIXI.Loader.shared
            .add("bg_light", `spine/light/skeleton.json`)
            .add("reels_light", `spine/reel/skeleton.json`)
            .add("logo_light", `spine/logo_light/skeleton.json`)
            .add("spine_big_win", `spine/big_win/skeleton.json`)
            .add("spine_super_big_win", `spine/super_big_win/skeleton.json`)
            .add("spine_mega_big_win", `spine/mega_big_win/skeleton.json`)
            .add("symbol_0", `spine/Symbols_Medium_Pay_1/skeleton.json`)
            .add("symbol_1", `spine/Symbols_Medium_Pay_2/skeleton.json`)
            .add("symbol_10", `spine/symbol_10/symbol_10.json`)
            .add("symbol_a", `spine/symbol_a/symbol_a.json`)
            .add("symbol_j", `spine/symbol_j/symbol_j.json`)
            .add("symbol_k", `spine/symbol_k/symbol_k.json`)
            .add("symbol_q", `spine/symbol_q/symbol_q.json`)
            .add("symbol_high_1", `spine/symbol_high_1/skeleton.json`)
            .add("symbol_high_2", `spine/symbol_high_2/skeleton.json`)
            .add("symbol_bonus", `spine/bonus_symbol/book.json`)
            //BONUS MODE
            .add("bonus_10", `spine/bonus_10/symbol_10.json`)
            .add("bonus_j", `spine/bonus_j/symbol_j.json`)
            .add("bonus_q", `spine/bonus_q/symbol_q.json`)
            .add("bonus_k", `spine/bonus_k/symbol_k.json`)
            .add("bonus_a", `spine/bonus_a/symbol_a.json`)
            .add("bonus_mid_01", `spine/bonus_mid_01/skeleton.json`)
            .add("bonus_mid_02", `spine/bonus_mid_02/skeleton.json`)
            .add("bonus_high_1", `spine/bonus_high_01/skeleton.json`)
            .add("bonus_high_2", `spine/bonus_high_02/skeleton.json`)
            .add("bonus_book", `spine/bonus_book/book.json`)
            .add("big_win_animations", `spine/big_win/skeleton.json`)
            .add("win_box", `spine/win_box/Winbox.json`)
            .add("logo_anim", `spine/logo/logo.json`)
            .add("anticipation_anim", `spine/anticipation/Winbox_reel.json`)
            .add("continue_bonus", `spine/ex_onboarding_1/skeleton.json`)
            .add("continue_table", `spine/ex_onboarding_2/skeleton.json`)
            .add("book_to_center", `spine/book_to_center/book.json`)
            .add("open_book_anim", `spine/book_open/book.json`)
            .add(`bitmap_fonts/big_win/font.xml`)
            //Gamble cards
            .add("card_A", `spine/card_A/skeleton.json`)
            .add("card_J", `spine/card_J/skeleton.json`)
            .add("card_K", `spine/card_K/skeleton.json`)
            .add("card_Q", `spine/card_Q/skeleton.json`)
            .add("card_back_A", `spine/card_back_A/skeleton.json`)
            .add("card_back_J", `spine/card_back_J/skeleton.json`)
            .add("card_back_K", `spine/card_back_K/skeleton.json`)
            .add("card_back_Q", `spine/card_back_Q/skeleton.json`)
            .add("expand_anim", `spine/expand/skeleton.json`)
            .add("bonus_spins_table", `spine/bonus_spins_table/skeleton.json`)
            .add("bg", `bg.jpg`);
        for (const atlas of ATLASES) {
            result = result.add(atlas, `${atlas}.json`);
        }

        if (LogicState.is_mobile) {
            result.add("m_bg", `portrait/bg.jpg`);
        }

        result.onProgress.add(() => {
            this.update_mask(result.progress / 100);
        });

        result.load(() => {
            for (const atlas of ATLASES) {
                const textures = PIXI.Loader.shared.resources[atlas].textures;
                if (textures) {
                    for (const texture of Object.keys(textures)) {
                        ASSETS[texture] = textures[texture];
                    }
                } else {
                    console.warn(`Textures not found in: ${atlas}`);
                }
            }

            document.dispatchEvent(this.on_game_loaded_event);
        });
    };

    on_resize = () => {
        if (LogicState.is_mobile) {
            if (document.body.clientWidth < document.body.clientHeight) {
                const coef =
                    (this.app.renderer.height / PIXI.settings.RESOLUTION -
                        1280) /
                    (2079 - 1280);

                this.bg!.y = (1 - coef) * -300;
                this.bg!.texture =
                    PIXI.Loader.shared.resources["m_bg_loading"].texture;

                this.slider_bg!.y =
                    this.app.renderer.height / PIXI.settings.RESOLUTION / 2 +
                    370;
                this.slider_fg!.y = this.slider_bg!.y + 9;
                this.slider_bg!.x = 200;
                this.slider_fg!.x = 210;
            } else {
                this.bg!.y = 0;
                this.bg!.texture =
                    PIXI.Loader.shared.resources["bg_loading"].texture;

                this.gj!.anchor.set(0.5, 0);

                this.slider_bg!.position.set(354, 540);
                this.slider_fg!.position.set(364, 549);
            }
        }
    };
}
