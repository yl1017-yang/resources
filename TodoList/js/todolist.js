// 초기 설정
const todoBtn = document.querySelector('.btn-todo');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const clearAllBtn = document.querySelector('.all-delete');
let { todoItems, masterKey } = getTodos();
// let masterKey = localStorage.length ? Math.max(...Object.keys(localStorage).map(Number)) + 1 : 0;
// let todos = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

// 로컬 스토리지에서 데이터 불러오기 -> 로컬 스토리지에서 저장된 할 일 항목을 불러와 초기화, masterKey는 각 할 일 항목의 고유 ID를 관리
function getTodos() {
  let todoItems = [];
  let masterKey = parseInt(localStorage.getItem('masterKey')) || 0;

  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key !== 'masterKey') {
        let item = JSON.parse(localStorage.getItem(key));
        if (item && item.item) {
          todoItems.push(item);
        }
      }
    }
    todoItems.sort((a, b) => a.id - b.id);
  }

  return { todoItems, masterKey };
}

// 할 일 추가 -> 새로운 할 일 항목을 생성하고 로컬 스토리지에 저장. 동일한 내용의 할 일이 중복되지 않도록 체크
function setTodos(todoItems) {
  const todoId = masterKey++;
  const todoItem = todoInput.value;

  const obj = {
    completed: false,
    id: todoId,
    item: todoItem,
    todayDate: new Date().toISOString().substring(0, 10),
    editMode: false,
  }

  console.log(todoId, todoItem, obj.todayDate);
  
  // 내용 중복 값 체크
  if (!todoItems.some(data => data.item == todoItem)) {
    todoItems.push(obj);
    todoItems.sort((a, b) => a.id - b.id);

    localStorage.setItem(todoId, JSON.stringify(obj));
    localStorage.setItem('masterKey', masterKey);
  } else {
    alert('동일 내용이 있슈! 다른 내용으로 입력해주!');
  }

  return obj; // obj를 반환하여 appendTodos 에 전달합니다.
}

// 할 일 렌더링 -> 할 일 항목을 HTML 요소로 생성하고 화면에 추가. 체크박스 이벤트 리스너를 추가하여 완료 상태를 토글
function appendTodos(todo, index) {
  const todoElement = document.createElement('li');
  todoElement.setAttribute('data-id', todo.id);
  todoElement.innerHTML = `
    <div><input type="checkbox" id="check${todo.id}" ${todo.completed ? 'checked' : ''}/><label for="check${todo.id}"></label></div>
    <div class="num">${index + 1}</div>
    <div class="list">${todo.item}</div>
    <div class="date">${todo.todayDate}</div>
    <div class="btn-wrap">
      <button class="btn btn-graya" onclick="editTodos(${todo.id})">수정</button>
      <button class="btn btn-red" onclick="removeTodos(${todo.id})">삭제</button>
    </div>
  `;

  const checkbox = todoElement.querySelector(`#check${todo.id}`);
  checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id));

  todoList.appendChild(todoElement);
}

// 할 일 완료 토글 -> 할 일 항목의 완료 상태를 토글. 완료 상태를 로컬 스토리지에 업데이트하고, 화면을 다시 렌더링
function toggleTodoCompletion(id) {
  const todo = todoItems.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem(id, JSON.stringify(todo));
    indexTodos();
  }
}

// 할 일 삭제 -> 로컬 스토리지에서 해당 할 일 항목을 삭제하고, 화면을 다시 렌더링
function removeTodos(id) {
  localStorage.removeItem(id);
  todoItems = todoItems.filter(todo => todo.id !== id);
  // const todoItem = document.querySelector(`li[data-id='${id}']`);
  // todoItem.remove();
  indexTodos();
}

// 할 일 수정 -> 할 일 항목을 수정모드로 전환
function editTodos(id) {
  const todo = todoItems.find(todo => todo.id === id);
  if (todo) {
    const todoElement = document.querySelector(`li[data-id='${id}']`);
    todoElement.innerHTML = `
      <div><input type="checkbox" id="check${todo.id}" ${todo.completed ? 'checked' : ''}/><label for="check${todo.id}"></label></div>
      <div class="num">${todoItems.indexOf(todo) + 1}</div>
      <div class="list"><input type="text" class="edit-input" value="${todo.item}"/></div>
      <div class="date">${todo.todayDate}</div>
      <div class="btn-wrap">
        <button class="btn btn-green" onclick="saveEdit(${todo.id})">저장</button>
        <button class="btn btn-graya" onclick="cancelEdit(${todo.id})">취소</button>
      </div>
    `;

    const checkbox = todoElement.querySelector(`#check${todo.id}`);
    checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id));
  }
}

// 할 일 수정 -> 수정된 내용을 저장
function saveEdit(id) {
  const todoElement = document.querySelector(`li[data-id='${id}']`);
  const editInput = todoElement.querySelector('.edit-input');
  const newValue = editInput.value.trim();

  if (newValue) {
    const todo = todoItems.find(todo => todo.id === id);
    if (todo) {
      todo.item = newValue;
      localStorage.setItem(id, JSON.stringify(todo));
      indexTodos();
    }
  } else {
    alert('수정할 내용을 입력해 주세요.');
  }
}

// 할 일 수정 -> 수정 모드를 취소하고 화면을 다시 렌더링
function cancelEdit() {
  indexTodos();
}


// 전체 삭제 -> 모든 할 일 항목을 삭제하고, masterKey를 초기화
clearAllBtn.addEventListener('click', () => {
  localStorage.clear();
  localStorage.setItem('masterKey', 0); // masterKey 초기화
  masterKey = 0;
  todoItems = [];
  todoList.innerHTML = '';
});

// 할 일 목록 렌더링 -> 현재 할 일 목록을 화면에 다시 렌더링
function indexTodos() {
  todoList.innerHTML = '';
  todoItems.forEach((todo, index) => appendTodos(todo, index));
}

// 초기 로딩 및 이벤트 리스너 - > 페이지가 로드될 때 할 일 목록을 렌더링
document.addEventListener('DOMContentLoaded', () => {
  indexTodos();
});

// 초기 로딩 및 이벤트 리스너 - > 할 일 항목을 추가
todoBtn.addEventListener('click', () => {
  if (todoInput.value) { 
    const newTodo = setTodos(todoItems);
    // appendTodos(newTodo);
    indexTodos();
    todoInput.value = '';
  } else {
    alert('click 내용이 없구만요. 입력해봐유~~~');
  }
});

// 초기 로딩 및 이벤트 리스너 - > 키보드 입력 이벤트 리스너는 엔터 키를 눌렀을 때 할 일 항목을 추가
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (todoInput.value) {
      const newTodo = setTodos(todoItems);
      // appendTodos(newTodo);
      indexTodos();
      todoInput.value = '';
    } else {
      alert('keypress 내용이 없구만요. 입력해봐유~~~');
    }
  } 
});










// 참고내용들
// 버튼 클릭 https://blogcreator.blog/post/1
// https://min88.tistory.com/entry/TIL-%F0%9F%92%A1-Day-9-JavaScript%EB%A1%9C-TodoList-%EB%A7%8C%EB%93%A4%EA%B8%B0
// https://woojong92.tistory.com/entry/JS-%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-ToDo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0-2-%ED%95%A0-%EC%9D%BC-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0

// https://velog.io/@rlorxl/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%84%9C%EB%B2%84%EC%99%80-%ED%86%B5%EC%8B%A0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95feat.-JSON
