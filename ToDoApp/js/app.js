// Variables
let todoList = document.querySelector("#todoList");
let todoInput = document.querySelector("#todoInput");
let todoAddBtn = document.querySelector("#todoAdd");

// Function
function getDataFromLocal(string) {
    return JSON.parse(localStorage.getItem(string)) || [];
}

function init() {
    getTodo();
}

function getTodo() {
    let todos = getDataFromLocal("todos");

    todos.length <= 0 &&
        (todoList.innerHTML = `
            <h3 class="todo--title">Create your task for your day</h3>
        `);

    todos.length > 0 && showTodo(todos);
}

function showTodo(todos) {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        let todoItem = new TodoItem({ ...todo, setTodo: editTodo });
        todoList.append(todoItem.render());
    });
}

function addTodo(task) {
    let todos = getDataFromLocal("todos");

    // Create todo obj
    let todo = {
        id: todos.length + 1,
        task,
        status: false,
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    getTodo();
}

function editTodo() {
    let todos = getDataFromLocal("todos");

    todos.forEach((todo) => {
        if (todo.id == this.getAttribute("data-index")) {
            if (this.firstElementChild.checked) {
                todo.status = true;
            } else {
                todo.status = false;
            }
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// Listen event
document.addEventListener("DOMContentLoaded", init);
todoAddBtn.addEventListener("click", function () {
    addTodo(todoInput.value);
    todoInput.value = "";
});
