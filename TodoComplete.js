let isAllCompleted = ''; // 전체 todos 체크 여부

const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true);
}

const setIsAllCompleted = (bool) => {
    isAllCompleted = bool
};

const completeAll = () => {
    completeAllBtnElem.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true}))
    setTodos(newTodos)
}

const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: false}));
    setTodos(newTodos)
}


// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
    if (getAllTodos().length === getCompletedTodos().length) {
        setIsAllCompleted(true);
        completeAllBtnElem.classList.add('checked');
    } else {
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
}

const onClickCompleteAll = () => {
    if (!getAllTodos().length) return; // todos배열의 길이가 0이면 return;

    if (isAllCompleted) incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리
    else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리
    setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
    print(); // 새로운 todos를 렌더링
    setLeftItems()
}