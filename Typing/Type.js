class Type{
    constructor(element, object = {
        strings: [],
        loop: Boolean,
        wait: parseInt(3000, 10),
    }) {
        this.element = document.querySelector(element);
        this.object = {
            ...object,
            wait: parseInt(3000,10),
            text: '',
            wordIndex: 0,
            typeSpeed: 3000,
            isDeleting: false,
        }
        this.type();
    }

    type() {
        // Variables
        let currentIndex = this.object.wordIndex % this.object.strings.length;
        let currentText = this.object.strings[currentIndex];
        this.object.typeSpeed = 300;

        // Check if deleting
        if (this.object.isDeleting) {
            // Delete character
            this.object.text = currentText.substring(0, this.object.text.length - 1);
            // Set typeSpeed quickly
            this.object.typeSpeed /= 2;
        } else {
            // Add character
            this.object.text = currentText.substring(0, this.object.text.length + 1);
        }

        // Render text into element
        this.element.innerHTML = `${this.object.text}`;

        // If last word is completed and loop is false
        if(this.object.strings[this.object.strings.length - 1] === this.object.text && !this.object.loop) {
            console.log(this.object.loop)
            clearTimeout(setTimeout(() => this.type(), this.object.typeSpeed));
            return;
        }

        // If word is completed
        if(!this.object.isDeleting && this.object.text === currentText) {
            // Make pause at end
            this.object.typeSpeed = this.object.wait;
            // Set isDeleting is true;
            this.object.isDeleting = true;
        } else if (this.object.isDeleting && this.object.text === "") {
            // Set isDeleting is false
            this.object.isDeleting = false;
            // Move to next word
            this.object.wordIndex++;
            // Pause before start typing
            this.object.typeSpeed = 500;
        }

        setTimeout(() => this.type(), this.object.typeSpeed);
    }
}

export default Type;