const todoBtn = document.querySelector('.btn-todo');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const clearAllBtn = document.querySelector('.all-delete');

// let masterKey = localStorage.length ? Math.max(...Object.keys(localStorage).map(Number)) + 1 : 0;
// let todos = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

let { todoItems, masterKey } = getTodos();

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


function setTodos(todoItems) {
  const todoId = masterKey++;
  const todoItem = todoInput.value;

  const obj = {
    completed: false,
    id: todoId,
    item: todoItem,
    todayDate: new Date().toISOString().substring(0, 10),
  }

  console.log(todoId, todoItem, obj.todayDate);
  
  // 내용 중복 값 체크
  if (!todoItems.some(data => data.item == todoItem)) {
    todoItems.push(obj);

    localStorage.setItem(todoId, JSON.stringify(obj));
    localStorage.setItem('masterKey', masterKey);
  } else {
    alert('동일 내용이 있슈! 다른 내용으로 입력해주!');
  }

  todoItems.sort((a, b) => a.id - b.id);

  return obj; // obj를 반환하여 appendTodos 에 전달합니다.
}

const appendTodos = (todo, index) => {
  todoList.innerHTML += `
    <li data-id="${todo.id}">
      <div><input type="checkbox" id="check${todo.id}" class="checkbox"/><label for="check${todo.id}"></label></div>
      <div class="num">${index + 1}</div>
      <div class="list">${todo.item}</div>
      <div class="date">${todo.todayDate}</div>
      <div class="btn-wrap">
        <button class="btn btn-graya">수정</button>
        <button class="btn btn-red" onclick="removeTodos(${todo.id})">삭제</button>
      </div>
    </li>
  `;
}

const removeTodos = (id) => {
  localStorage.removeItem(id);
  todoItems = todoItems.filter(todo => todo.id !== id);
  // const todoItem = document.querySelector(`li[data-id='${id}']`);
  // todoItem.remove();
  indexTodos();
}

clearAllBtn.addEventListener('click', () => {
  localStorage.clear();
  localStorage.setItem('masterKey', 0); // masterKey 초기화
  masterKey = 0;
  todoItems = [];
  todoList.innerHTML = '';
});

const indexTodos = () => {
  todoList.innerHTML = '';
  todoItems.forEach((todo, index) => appendTodos(todo, index));

  // 체크박스 이벤트 리스너 추가
  const toggleBtns = document.querySelectorAll('.checkbox');
  toggleBtns.forEach((toggleBtn) => {
    toggleBtn.addEventListener("change", () => {
      if (toggleBtn.checked) {
        console.log(`Checkbox ${toggleBtn.id} is checked`);
        todoItems[index].completed = !todoItems[index].completed;
      } else {
        console.log(`Checkbox ${toggleBtn.id} is unchecked`);
      }
    });
  });

}

document.addEventListener('DOMContentLoaded', () => {
  indexTodos();
});

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
