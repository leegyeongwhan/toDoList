export class TodoView {
    constructor(todoList, todoListElem, leftItemsElem) {
        this.todoList = todoList;
        this.todoListElem = todoListElem;
        this.leftItemsElem = leftItemsElem;
    }

    setFilter(e, filter) {
        this.todoList.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        this.render();
    }

    render() {
        this.todoListElem.innerHTML = '';
        let todos;

        switch (this.todoList.currentFilter) {
            case 'active':
                todos = this.todoList.getActiveTodos();
                break;
            case 'completed':
                todos = this.todoList.getCompletedTodos();
                break;
            case 'all':
            default:
                todos = this.todoList.getAllTodos();
                break;
        }

        todos.forEach(todo => this.renderTodoItem(todo));
        this.leftItemsElem.innerHTML = `${this.todoList.getActiveTodos().length} items left`;
    }

    renderTodoItem(todo) {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');
        todoItemElem.setAttribute('data-id', todo.id);

        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');
        checkboxElem.addEventListener('click', () => {
            this.todoList.toggleTodo(todo.id);
            this.render();
        });

        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.addEventListener('dblclick', (event) => this.onDbclickTodo(event, todo.id));
        todoElem.innerText = todo.content;

        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', () => {
            this.todoList.deleteTodo(todo.id);
            this.render();
        });
        delBtnElem.innerHTML = 'X';

        if (todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);

        this.todoListElem.appendChild(todoItemElem);
    }

    onDbclickTodo = (e, todoId) => {
        const todoElem = e.target;
        const inputText = e.target.innerText;
        const todoItemElem = todoElem.parentNode;
        const inputElem = document.createElement('input');
        inputElem.value = inputText;
        inputElem.classList.add('edit-input');
        inputElem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.todoList.updateTodoContent(todoId, e.target.value);
                document.body.removeEventListener('click', onClickBody);
                this.render();
            }
        });

        const onClickBody = (e) => {
            if (e.target !== inputElem) {
                todoItemElem.removeChild(inputElem);
                document.body.removeEventListener('click', onClickBody);
            }
        }

        document.body.addEventListener('click', onClickBody);
        todoItemElem.appendChild(inputElem);
    }
}
