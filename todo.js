const todoInputElem = document.querySelector('.todo-inner');
const todoListElem = document.querySelector('.todo-list');

let todos = []; //현재 할일 목록 저장
let id = 0;

const setTodos = (newTodos) => {
    todos = newTodos;
    print(); // todos가 변경될 때마다 화면 갱신
}

const getAllTodos = () => {
    return todos;
}

const insertTodo = (content) => {
    const newId = id++;
    const newTodo = { id: newId, isCompleted: false, content };
    setTodos([...getAllTodos(), newTodo]);
}


const print = () => {
    todoListElem.innerHTML = ''; //todoListElem 요소 안의 HTML 초기화
    const allTodos = getAllTodos(); // todos 배열 가져오기

    // "todo-item"에 해당하는 HTML을 그려서 "todo-list"에 추가하기
    allTodos.forEach(todo => {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');

        // todoItemElem.setAttribute('data-id', todo.id );
        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');

        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;

        const delBtnElem = createDeleteButton(todo.id); // 삭제 버튼 생성

        if(todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);
        todoListElem.appendChild(todoItemElem);
    });
}


const deleteTodo = (todoId) => {
    console.log(todoId);
    setTodos(getAllTodos().filter(todo => todo.id !== todoId));
}

const completeTodo = (todoId) => {
    setTodos(getAllTodos().map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
}

//리스너등록
const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            insertTodo(e.target.value);
            todoInputElem.value = '';
        }
    })
}

const createDeleteButton = (todoId) => {
    const delBtnElem = document.createElement('button');
    delBtnElem.classList.add('delBtn');
    delBtnElem.addEventListener('click', () => deleteTodo(todoId));
    delBtnElem.innerHTML = 'X';
    return delBtnElem;
}

init()