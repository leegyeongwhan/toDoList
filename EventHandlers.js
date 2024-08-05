// 이벤트 핸들러

const onClickCompleteAll = () => {
    if (!getAllTodos().length) return;

    if (isAllCompleted) {
        setTodos(getAllTodos().map(todo => ({ ...todo, isCompleted: false })));
    } else {
        setTodos(getAllTodos().map(todo => ({ ...todo, isCompleted: true })));
    }

    setIsAllCompleted(!isAllCompleted);
    paintTodos();
    setLeftItems();
}

const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    inputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            document.body.removeEventListener('click', onClickBody);
        }
    });

    const onClickBody = (e) => {
        if (e.target !== inputElem) {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody);
        }
    };

    document.body.addEventListener('click', onClickBody);
    todoItemElem.appendChild(inputElem);
}

const onClickShowTodosType = (e) => {
    const currentBtnElem = e.target;
    const newShowType = currentBtnElem.dataset.type;

    if (currentShowType === newShowType) return;

    document.querySelector(`.show-${currentShowType}-btn`).classList.remove('selected');
    currentBtnElem.classList.add('selected');

    setCurrentShowType(newShowType);
    paintTodos();
}
