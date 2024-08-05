// 초기화

export const todoInputElem = document.querySelector('.todo-input');
export const todoListElem = document.querySelector('.todo-list');
export const completeAllBtnElem = document.querySelector('.complete-all-btn');
export const leftItemsElem = document.querySelector('.left-items');
export const showAllBtnElem = document.querySelector('.show-all-btn');
export const showActiveBtnElem = document.querySelector('.show-active-btn');
export const showCompletedBtnElem = document.querySelector('.show-completed-btn');
export const clearCompletedBtnElem = document.querySelector('.clear-completed-btn');

import { appendTodos, onClickCompleteAll, onClickShowTodosType, clearCompletedTodos, setLeftItems } from './todoLogic.js';

export const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendTodos(e.target.value);
            todoInputElem.value = '';
        }
    });
    completeAllBtnElem.addEventListener('click', onClickCompleteAll);
    showAllBtnElem.addEventListener('click', onClickShowTodosType);
    showActiveBtnElem.addEventListener('click', onClickShowTodosType);
    showCompletedBtnElem.addEventListener('click', onClickShowTodosType);
    clearCompletedBtnElem.addEventListener('click', clearCompletedTodos);
    setLeftItems();
}