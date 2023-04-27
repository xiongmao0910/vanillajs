import Type from "./Type.js";

// Variables
const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector(`#${navToggle.getAttribute('aria-controls')}`);

// Functions
const init = function() {
    new Type('#writer', {
        strings: [
            "Jang Min-Jun",
            "Student",
            "Web Developer"
        ],
    });
};

const openMenu = () => {
    const isOpen = nav.getAttribute("data-visible");

    if(isOpen == "true") {
        nav.setAttribute("data-visible", "false");
    } else {
        nav.setAttribute("data-visible", "true");
    }
};

// Listen event
document.addEventListener('DOMContentLoaded', init);
navToggle.addEventListener("click", openMenu);