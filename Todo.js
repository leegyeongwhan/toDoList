const todoInputElem = document.querySelector('.todo-inner');
const todoListElem = document.querySelector('.todo-list');

let todos = []; //현재 할일 목록 저장
let id = 0;

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const deleteTodo = (todoId) => {
    console.log(todoId);
    setTodos(getAllTodos().filter(todo => todo.id !== todoId));
    print();
}

const completeTodo = (todoId) => {
    setTodos(getAllTodos().map(todo =>
        todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo
    ));
    print();
}

const updateTodo = (text, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
    setTodos(newTodos);
    print();
}

const insertTodo = (content) => {
    const newId = id++;
    const newTodo = {id: newId, isCompleted: false, content};
    setTodos([...getAllTodos(), newTodo]);
    print();
}


