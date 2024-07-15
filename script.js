const todo = document.querySelector("#todo");
const addBtn = document.querySelector("#addBtn");
const todoBox = document.querySelector("#todoBox");

addBtn.addEventListener("click", () => {
    const newTodo = document.createElement("li");
    const checkBox = document.createElement("input");
    const text = document.createElement("span");
    const rmBtn = document.createElement("button");

    text.innerText = todo.value;
    checkBox.type = "checkBox";
    rmBtn.innerText = "x";

    newTodo.appendChild(checkBox);
    newTodo.appendChild(text);
    newTodo.appendChild(rmBtn);
    todoBox.appendChild(newTodo);

    todo.value = "";

    checkBox.addEventListener("change", () => {
        newTodo.classList.toggle("check");
    });

    rmBtn.addEventListener("click", (event) => {
        todoBox.removeChild(event.currentTarget.parentNode);
    });
});
