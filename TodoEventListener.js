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

    inputElem.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter') {
            updateTodo(e.target.value, todoId); // todo 수정
            document.body.removeEventListener('click', onClickBody ); // 이벤트리스너 제거
        }
    })

    todoItemElem.appendChild(inputElem); // todoItemElem 요소에 자식 요소로 inputElem 요소 추가

    // body에 클릭에 대한 이벤트 리스너 등록
    document.body.addEventListener('click', onClickBody)

    // todoItemElem 요소를 제외한 영역을 클릭 시, 수정모드 종료
    const onClickBody = (e) => {
        if(e.target !== inputElem)  {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody );
        }
    }
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

        if (todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);
        todoListElem.appendChild(todoItemElem);
    });
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