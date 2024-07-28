const todoInputElem = document.querySelector('.todo-inner');
const todoListElem = document.querySelector('.todo-list');
const completeAllBtnElem = document.querySelector('.complete-all-btn');

const leftItemsElem = document.querySelector('.left-items')

let todos = []; //현재 할일 목록 저장
let id = 0;

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const setIsAllCompleted = (bool) => { isAllCompleted = bool};

const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true );
}

let isAllCompleted = ''; // 전체 todos 체크 여부


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


