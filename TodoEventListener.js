const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true );
}

let isAllCompleted = ''; // 전체 todos 체크 여부

const setIsAllCompleted = (bool) => { isAllCompleted = bool};

const completeAll = () => {
    completeAllBtnElem.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true }) )
    setTodos(newTodos)
}

const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked');
    const newTodos =  getAllTodos().map(todo => ({...todo, isCompleted: false }) );
    setTodos(newTodos)
}

// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
    if(getAllTodos().length === getCompletedTodos().length ){
        setIsAllCompleted(true);
        completeAllBtnElem.classList.add('checked');
    }else {
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
}

const onClickCompleteAll = () => {
    if(!getAllTodos().length) return; // todos배열의 길이가 0이면 return;

    if(isAllCompleted) incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리
    else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리
    setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
    print(); // 새로운 todos를 렌더링
    setLeftItems()
}

const createDeleteButton = (todoId) => {
    const delBtnElem = document.createElement('button');
    delBtnElem.classList.add('delBtn');
    delBtnElem.addEventListener('click', () => deleteTodo(todoId));
    delBtnElem.innerHTML = 'X';
    return delBtnElem;
}

const onDoubleClick = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    inputElem.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            document.body.removeEventListener('click', onClickBody );
        }
    })

    const onClickBody = (e) => {
        if(e.target !== inputElem)  {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody );
        }
    }

    document.body.addEventListener('click', onClickBody)
    todoItemElem.appendChild(inputElem);
}


const print = () => {
    todoListElem.innerHTML = ''; //todoListElem 요소 안의 HTML 초기화
    const allTodos = getAllTodos() // todos 배열 가져오기

    allTodos.forEach(todo => {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');

        todoItemElem.setAttribute('data-id', todo.id );

        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');
        checkboxElem.addEventListener('click', () => completeTodo(todo.id))

        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id))
        todoElem.innerText = todo.content;

        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', () =>  deleteTodo(todo.id))
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
            insertTodo(e.target.value);
            todoInputElem.value = '';
        }
    })
}


init()