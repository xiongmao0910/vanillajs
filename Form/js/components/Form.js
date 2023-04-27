class Form {
    #element = HTMLElement;
    #regexp = RegExp;
    #errorMessage = String;
    #isShow = Boolean;

    constructor(element) {
        this.#element = document.querySelector(element);

        switch (this.#element.getAttribute("type")) {
            case "text": {
                this.#regexp = /^[a-zA-Z ]{3}$/;
                break;
            }
            case "email": {
                this.#regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                break;
            }
            case "password": {
                this.#regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                break;
            }
        }
        this.#errorMessage = this.#element.getAttribute("aria-errormessage");
        this.#isShow = false;

        this.#validation();
    }

    #validation() {
        let validFunc = this.#check.bind(this);

        this.#element.addEventListener("focusout", function () {
            let value = this.value;
            validFunc(value);
        });
    }

    #check(value) {
        if (!value) {
            this.#errorMessage =
                this.#element.getAttribute("aria-errormessage");
            this.#showError(this.#errorMessage);
        } else if (!this.#regexp.test(value)) {
            this.#errorMessage = "Pleased enter a valid for this field!";
            this.#showError(this.#errorMessage);
        } else {
            if (this.#isShow) {
                this.#isShow = false;
                const formErrorDOM = this.#element.parentElement.querySelector(
                    ".form--notification"
                );
                this.#element.style.border = "thin solid rgba(0, 0, 0, 0.5)";
                this.#element.parentElement.removeChild(formErrorDOM);
            }
        }
    }

    #showError(message) {
        if (!this.#isShow) {
            const formErrorDOM = document.createElement("p");
            formErrorDOM.classList.add("form--notification", "form--error");
            formErrorDOM.innerText = message;
            this.#element.style.border = "thin solid #ff0000";
            this.#element.parentElement.appendChild(formErrorDOM);

            this.#isShow = true;
        } else {
            const formErrorDOM = this.#element.parentElement.querySelector(
                ".form--notification"
            );
            formErrorDOM.innerText = message;
        }
    }
}
