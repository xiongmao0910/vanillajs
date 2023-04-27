import Question from "./Question.js";


export default class Quiz {
    constructor(element, obj = {
        strings: [],
    }) {
        this.element = document.querySelector(element);
        this.obj = {
            ...obj,
            quizIndex: 0,
            quizPoint: 0,
        }

        this.start();
    }

    start() {
        // Show question
        this.show(this.obj.quizIndex);
    }

    show(index) {
        this.element.innerHTML = "";

        if(index <= this.obj.strings.length - 1){
            // Get info question
            let quesInfo = this.obj.strings[index];
            // Show question and all options of question
            const nextFunc = this.next.bind(this);
            this.element = Question(this.element, quesInfo, nextFunc);
        } else {
            this.element.innerHTML = `
                <h1 class="text-uppercase">congratulations!</h1>
                <div class="quiz--box">
                    <p>You have ${this.obj.quizPoint} / ${this.obj.strings.length} point</p>
                </div>
            `;
        }
    }

    next(quizSolutionIndex, quizAnswer) {
        const quizSolutionsDOM = document.querySelectorAll(".quiz--option");

        if(quizSolutionIndex + 1 === quizAnswer) {
            quizSolutionsDOM[quizSolutionIndex].style = `
                background-color: green;
                color: white;
            `;
            this.obj.quizPoint++;
        } else {
            quizSolutionsDOM[quizSolutionIndex].style = `
                background-color: red;
                color: white;
            `;

            quizSolutionsDOM[quizAnswer - 1].style = `
                background-color: green;
                color: white;
            `;
        }

        this.obj.quizIndex++;
        setTimeout(() => this.show(this.obj.quizIndex), 3000);
    }
}