class Slider {
    #element = String;
    #sliderIndex = Number;

    constructor(element) {
        this.#element = document.querySelector(element);
        this.#sliderIndex = 0;

        this.#start();
    }

    #start() {
        this.#element.firstElementChild.style.width = `${
            this.#element.firstElementChild.childElementCount * 100
        }%`;

        console.log(this.#element.firstElementChild.childElementCount * 100);

        const sliderPrev = document.createElement("button");
        sliderPrev.id = "sliderPrev";
        sliderPrev.innerHTML =
            '<ion-icon name="chevron-back-outline"></ion-icon>';

        let prevFunc = this.#prev.bind(this);

        sliderPrev.addEventListener("click", prevFunc);

        const sliderNext = document.createElement("button");
        sliderNext.id = "sliderNext";
        sliderNext.innerHTML =
            '<ion-icon name="chevron-forward-outline"></ion-icon>';

        let nextFunc = this.#next.bind(this);
        sliderNext.addEventListener("click", nextFunc);

        this.#element.appendChild(sliderPrev);
        this.#element.appendChild(sliderNext);
    }

    #show(slideId) {
        let sliderDiv = this.#element.firstElementChild;
        console.log(slideId);
        sliderDiv.style.transform = `translateX(calc(${slideId} * -${
            100 / this.#element.firstElementChild.childElementCount
        }%))
        `;
    }

    #next() {
        if (
            this.#sliderIndex >=
            this.#element.firstElementChild.childElementCount - 1
        ) {
            return;
        }

        this.#sliderIndex++;

        this.#show(this.#sliderIndex);
    }

    #prev() {
        if (this.#sliderIndex <= 0) {
            return;
        }
        this.#sliderIndex--;

        this.#show(this.#sliderIndex);
    }
}
