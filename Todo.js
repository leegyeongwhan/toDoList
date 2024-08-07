export class Todo {
    //TODOList 엔티티
    constructor() {
        this.todoList = [];
        this.id = 0;
        this.isAllCompleted = false;
        this.currentFilter = 'all';
    }

    getAllTodos() {
        return this.todoList;
    }

    getCompletedTodos() {
        return this.todoList.filter(todo => todo.isCompleted);
    }

    getActiveTodos() {
        return this.todoList.filter(todo => !todo.isCompleted);
    }

    addTodo(content) {
        this.id++;
        this.todoList.push({id: this.id, content, isCompleted: false});
    }

    deleteTodo(id) {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
    }

    toggleTodo(id) {
        this.todoList = this.todoList.map(todo =>
            todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
        );
    }

    updateTodoContent(id, content) {
        this.todoList = this.todoList.map(todo =>
            todo.id === id ? {...todo, content} : todo
        );
    }

    toggleAll() {
        this.isAllCompleted = !this.isAllCompleted;
        this.todoList = this.todoList.map(todo => ({...todo, isCompleted: this.isAllCompleted}));
    }

    clearCompleted() {
        this.todoList = this.getActiveTodos();
    }
}
