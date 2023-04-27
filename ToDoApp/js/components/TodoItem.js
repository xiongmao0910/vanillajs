class TodoItem {
    constructor(
        obj = {
            id: Number,
            task: String,
            status: Boolean,
            setTodo: Function,
        }
    ) {
        this.obj = obj;
    }

    render() {
        let todoLabelDOM = document.createElement("label");
        todoLabelDOM.classList.add("todo--control");
        todoLabelDOM.setAttribute("data-index", this.obj.id);

        let todoInputDOM = document.createElement("input");
        todoInputDOM.type = "checkbox";

        if (this.obj.status) {
            todoInputDOM.checked = true;
        }

        let todoSpanDOM = document.createElement("span");
        todoSpanDOM.innerText = this.obj.task;

        todoLabelDOM.appendChild(todoInputDOM);
        todoLabelDOM.appendChild(todoSpanDOM);

        todoLabelDOM.onclick = this.obj.setTodo;

        return todoLabelDOM;
    }
}
