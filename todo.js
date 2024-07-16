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

const appendTodos = (text) => {
    const newId = id++;
    const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text}]
    setTodos(newTodos)
    paintTodos();
}


const paintTodos = () => {
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

        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.innerHTML = 'X';

        if(todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);

        todoListElem.appendChild(todoItemElem);
    })
}

//리스너등록
const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendTodos(e.target.value);
            todoInputElem.value = '';
        }
    })
}

init()