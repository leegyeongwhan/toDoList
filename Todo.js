// todoLogic.js

import { todoListElem, completeAllBtnElem, leftItemsElem } from './EventHandlers.js';
import { paintTodos } from './Render.js';

let id = 0;
let isAllCompleted = false;
let currentShowType = 'all';
let todos = [];

export const setId = (newId) => { id = newId; }
export const setIsAllCompleted = (bool) => { isAllCompleted = bool; }
export const setCurrentShowType = (newShowType) => { currentShowType = newShowType; }
export const setTodos = (newTodos) => { todos = newTodos; }

export const getAllTodos = () => todos;
export const getCompletedTodos = () => todos.filter(todo => todo.isCompleted === true);
export const getActiveTodos = () => todos.filter(todo => todo.isCompleted === false);

export const setLeftItems = () => {
    const leftTodos = getActiveTodos();
    leftItemsElem.innerHTML = `${leftTodos.length} items left`;
}

export const completeAll = () => {
    completeAllBtnElem.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({ ...todo, isCompleted: true }));
    setTodos(newTodos);
}

export const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked');
    const newTodos = getAllTodos().map(todo => ({ ...todo, isCompleted: false }));
    setTodos(newTodos);
}

export const checkIsAllCompleted = () => {
    if (getAllTodos().length === getCompletedTodos().length) {
        setIsAllCompleted(true);
        completeAllBtnElem.classList.add('checked');
    } else {
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
}

export const onClickCompleteAll = () => {
    if (!getAllTodos().length) return;
    if (isAllCompleted) incompleteAll();
    else completeAll();
    setIsAllCompleted(!isAllCompleted);
    paintTodos();
    setLeftItems();
}

export const appendTodos = (text) => {
    const newId = id + 1;
    setId(newId);
    const newTodos = getAllTodos().concat({ id: newId, isCompleted: false, content: text });
    setTodos(newTodos);
    setLeftItems();
    checkIsAllCompleted();
    paintTodos();
}

export const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    setLeftItems();
    paintTodos();
}

export const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo);
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
    checkIsAllCompleted();
}

export const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const newTodos = currentTodos.map(todo => todo.id === todoId ? ({ ...todo, content: text }) : todo);
    setTodos(newTodos);
    paintTodos();
}

export const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    inputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            document.body.removeEventListener('click', onClickBody);
        }
    })

    const onClickBody = (e) => {
        if (e.target !== inputElem) {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody);
        }
    }

    document.body.addEventListener('click', onClickBody)
    todoItemElem.appendChild(inputElem);
}

export const clearCompletedTodos = () => {
    const newTodos = getActiveTodos();
    setTodos(newTodos);
    paintTodos();
}

export const onClickShowTodosType = (e) => {
    const currentBtnElem = e.target;
    const newShowType = currentBtnElem.dataset.type;

    if (currentShowType === newShowType) return;

    const preBtnElem = document.querySelector(`.show-${currentShowType}-btn`);
    preBtnElem.classList.remove('selected');

    currentBtnElem.classList.add('selected');
    setCurrentShowType(newShowType);
    paintTodos();
}
