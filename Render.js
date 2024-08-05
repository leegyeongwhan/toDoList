// render.js

import { todoListElem } from './domElements.js';
import { getAllTodos, getActiveTodos, getCompletedTodos, currentShowType, deleteTodo, completeTodo, onDbclickTodo } from './todoLogic.js';

export const paintTodo = (todo) => {
    const todoItemElem = document.createElement('li');
    todoItemElem.classList.add('todo-item');
    todoItemElem.setAttribute('data-id', todo.id);

    const checkboxElem = document.createElement('div');
    checkboxElem.classList.add('checkbox');
    checkboxElem.addEventListener('click', () => completeTodo(todo.id));

    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');
    todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id));
    todoElem.innerText = todo.content;

    const delBtnElem = document.createElement('button');
    delBtnElem.classList.add('delBtn');
    delBtnElem.addEventListener('click', () => deleteTodo(todo.id));
    delBtnElem.innerHTML = 'X';

    if (todo.isCompleted) {
        todoItemElem.classList.add('checked');
        checkboxElem.innerText = '✔';
    }

    todoItemElem.appendChild(checkboxElem);
    todoItemElem.appendChild(todoElem);
    todoItemElem.appendChild(delBtnElem);

    todoListElem.appendChild(todoItemElem);
}

export const paintTodos = () => {
    todoListElem.innerHTML = '';

    switch (currentShowType) {
        case 'all':
            const allTodos = getAllTodos();
            allTodos.forEach(todo => { paintTodo(todo); });
            break;
        case 'active':
            const activeTodos = getActiveTodos();
            activeTodos.forEach(todo => { paintTodo(todo); });
            break;
        case 'completed':
            const completedTodos = getCompletedTodos();
            completedTodos.forEach(todo => { paintTodo(todo); });
            break;
        default:
            break;
    }
}
