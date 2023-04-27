export default function Question(element, { id, question, solutions, answer }, quizFunc) {
    let quizBox = document.createElement("div");
    quizBox.classList.add("quiz--box");
    
    let quizQuestion = document.createElement("p");
    quizQuestion.classList.add("quiz--question");
    quizQuestion.innerHTML = question;

    let quizSolution = document.createElement("div");
    quizSolution.classList.add("quiz--solution", "flow");

    quizBox.appendChild(quizQuestion);
    
    solutions.forEach((solution, solutionIndex) => {
        let quizOption = document.createElement("button");
        quizOption.classList.add("quiz--option", "btn");
        quizOption.innerText = `${solutionIndex + 1}: ${solution}`;

        quizOption.onclick = function() {
            quizFunc(solutionIndex, answer);
        };

        quizSolution.appendChild(quizOption);
    });

    element.appendChild(quizBox);
    element.appendChild(quizSolution);

    return element;
}