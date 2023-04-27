class Type {
    constructor(element, props = {
        strings: [],
    }) {
        // Element DOM
        this.element = document.querySelector(element);
        // Object
        this.props = {
            ...props,
            text: '',
            wordIndex: 0,
            wait: parseInt(3000, 10),
            isDeleting: false,
        };
        // Function
        this.type();
    };

    type() {
        // Current index of strings
        const current = this.props.wordIndex % this.props.strings.length;
        // Get full text of current word
        const fullText = this.props.strings[current];

        // Check if deleting
        if(this.props.isDeleting) {
            // Remove char
            this.props.text = fullText.substring(0, this.props.text.length - 1);
        } else {
            // Add char
            this.props.text = fullText.substring(0, this.props.text.length + 1);
        }

        // Insert text into element
        this.element.innerText = this.props.text;

        // Initial type speed
        let typeSpeed = 300;

        if(this.props.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.props.isDeleting && this.props.text === fullText) {
            // Make pause at end
            typeSpeed = this.props.wait;
            // Set delete to true
            this.props.isDeleting = true;
        } else if(this.props.isDeleting && this.props.text === '') {
            this.props.isDeleting = false;
            // Move to next word
            this.props.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        
            setTimeout(() => this.type(), typeSpeed);
    }
}

export default Type;