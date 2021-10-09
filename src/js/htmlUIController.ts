import {EVENTS} from "./Events";
import {GUYS_CONFIG} from "./Config";
import {LogicState} from "./LogicState";

export class htmlUIController {
    menu = document.getElementById("menu");
    chooseMenu = document.getElementById("choose");
    cardList = document.getElementById("cardList");
    canvas = document.getElementById("scene");
    endGame = document.getElementById("endGame");
    assetsAddress = "./assets/guys/"

    constructor() {
        document.addEventListener(EVENTS.playClicked, () => {
            this.menu?.classList.toggle("hidden");
            this.chooseMenu?.classList.toggle("hidden");
        })

        document.addEventListener(EVENTS.gameOver, () => {
            this.canvas?.classList.toggle("hidden");
            this.endGame?.classList.toggle("hidden");
        })

        this.addGuys();

        this.endGame!.onclick = () => {
            this.endGame?.classList.toggle("hidden");
            this.menu?.classList.toggle("hidden");
        }
    }

    addGuys = () => {
        for (let i = 0; i < Object.keys(GUYS_CONFIG).length; i++) {

            //@ts-ignore
            const guy = GUYS_CONFIG[Object.keys(GUYS_CONFIG)[i]];

            const tempalate = `
                <img src=${this.assetsAddress + guy.head.left + ".png"} alt="tipok" style="width:100%">
                <div class="container">
                    <p class="cardText">${guy.name}</p>
                </div>
            `;

            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = tempalate;

            card.onclick = () => {
                LogicState.currentGuy = guy.key;
                document.dispatchEvent(new Event(EVENTS.startGame));
                this.chooseMenu?.classList.toggle("hidden");
                this.canvas?.classList.toggle("hidden");
            }

            this.cardList?.appendChild(card);
        }
    }
}
