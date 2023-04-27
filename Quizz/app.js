import Quiz from "./Quiz.js";

// Variables
let quizData = [
    {
        id: 1,
        question: "What is Ariana Grande’s favourite board game?",
        solutions: [
            "Cluedo",
            "Monopoly",
            "Trivial Pursuit",
            "Cranium",
        ],
        answer: 2,
    },
    {
        id: 2,
        question: "How tall is Ariana Grande?",
        solutions: [
            "5’3”",
            "5’5”",
            "5’8”",
            "6’1”",
        ],
        answer: 1,
    },
    {
        id: 3,
        question: "What was Ariana Grande’s first song?",
        solutions: [
            "Side to Side",
            "God is a woman",
            "Put your Hearts Up",
            "7 Rings"
        ],
        answer: 3,
    },
    {
        id: 4,
        question: "What was her second album?",
        solutions: [
            "My Everything",
            "Thank U, Next",
            "Positions",
            "Problem"
        ],
        answer: 1,
    },
    {
        id: 5,
        question: "Who did Ariana Grande collaborate with on the song ‘Rain on me’?",
        solutions: [
            "Nicky Minaj",
            "Adele",
            "J-Lo",
            "Lady Gaga"
        ],
        answer: 4,
    },
]

let quizStartBtn = document.querySelector("#quizStartBtn");

quizStartBtn.addEventListener("click", () => {
    let quizGame = new Quiz("#quizContainer", {
        strings: quizData,
    });
})