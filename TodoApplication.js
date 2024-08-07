import { Todo } from './Todo.js';
import { TodoView } from './TodoView.js';

export class TodoApplication {
    constructor() {
        this.todoInputElem = document.querySelector('.todo-input');
        this.todoListElem = document.querySelector('.todo-list');
        this.completeAllBtnElem = document.querySelector('.complete-all-btn');
        this.leftItemsElem = document.querySelector('.left-items');
        this.showAllBtnElem = document.querySelector('.show-all-btn');
        this.showActiveBtnElem = document.querySelector('.show-active-btn');
        this.showCompletedBtnElem = document.querySelector('.show-completed-btn');
        this.clearCompletedBtnElem = document.querySelector('.clear-completed-btn');

        this.todoList = new Todo();
        this.todoView = new TodoView(this.todoList, this.todoListElem, this.leftItemsElem);

        this.init();
    }

    init() {
        this.todoInputElem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.todoList.addTodo(e.target.value);
                e.target.value = '';
                this.todoView.render();
            }
        });
        this.completeAllBtnElem.addEventListener('click', () => {
            this.todoList.toggleAll();
            this.todoView.render();
        });
        this.showAllBtnElem.addEventListener('click', (e) => this.todoView.setFilter(e, 'all'));
        this.showActiveBtnElem.addEventListener('click', (e) => this.todoView.setFilter(e, 'active'));
        this.showCompletedBtnElem.addEventListener('click', (e) => this.todoView.setFilter(e, 'completed'));
        this.clearCompletedBtnElem.addEventListener('click', () => {
            this.todoList.clearCompleted();
            this.todoView.render();
        });

        this.todoView.render();
    }
}