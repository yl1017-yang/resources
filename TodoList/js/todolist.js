const todoBtn = document.querySelector('.btn-todo');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const clearAllBtn = document.querySelector('.all-delete');

let masterKey = localStorage.length ? Math.max(...Object.keys(localStorage).map(Number)) + 1 : 0;
let todos = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

function pushTodos(todos) {
  const todoId = masterKey++;
  const todoItem = todoInput.value;

  const obj = {
    completed: false,
    id: todoId,
    item: todoItem,
    todayDate: new Date().toISOString().substring(0, 10),
  }

  console.log(todoId, todoItem, obj.todayDate);
  
  const objString = JSON.stringify(obj);
  localStorage.setItem(todoId, objString);
  todos.push(obj);
  todos.sort((a, b) => a.id - b.id);

  return obj; // obj를 반환하여 appendTodos에 전달합니다.
}

const appendTodos = (todo) => {
  todoList.innerHTML += `
    <li data-id="${todo.id}">
      <div class="num">${todo.id}</div>
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
  todos = todos.filter(todo => todo.id !== id);
  const todoItem = document.querySelector(`li[data-id='${id}']`);
  todoItem.remove();
}

clearAllBtn.addEventListener('click', () => {
  localStorage.clear();
  todos = [];
  todoList.innerHTML = '';
});

document.addEventListener('DOMContentLoaded', () => {
  todos.forEach(todo => appendTodos(todo));
});

todoBtn.addEventListener('click', () => {
  if ( todoInput.value ) { 
    const newTodo = pushTodos(todos); 
    appendTodos(newTodo);
    todoInput.value = '';
  } else {
    alert('click 내용이 없구만요. 입력해봐유~~~');
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (todoInput.value) {
      const newTodo = pushTodos(todos);
      appendTodos(newTodo);
      todoInput.value = '';
    } else {
      alert('keypress 내용이 없구만요. 입력해봐유~~~');
    }
  } 
});











// fetch API + nodejs가 필요함
// function getData() {
//   return fetch('./js/data.json')
//     .then((response) => response.json())
//     .then((json) => json.items);
// }

// getData().then((items) => {
//   console.log(items);
//   appendTodos(items); 
// });

// function appendTodos(items) {
//   const content = document.querySelector('.todo-list');
//   content.innerHTML = items.map((item) => createHTMLStrign(item)).join('');
// }

// function createHTMLStrign(item) {
//   return `
//     <li>
//       <div class="num">${item.id}</div>
//       <div class="list">${item.content}</div>
//       <div class="date">${item.date}</div>
//     </li>
//   `
// }




// 참고내용들
// 버튼 클릭 https://blogcreator.blog/post/1
// https://min88.tistory.com/entry/TIL-%F0%9F%92%A1-Day-9-JavaScript%EB%A1%9C-TodoList-%EB%A7%8C%EB%93%A4%EA%B8%B0
// https://woojong92.tistory.com/entry/JS-%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-ToDo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0-2-%ED%95%A0-%EC%9D%BC-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0

// https://velog.io/@rlorxl/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%84%9C%EB%B2%84%EC%99%80-%ED%86%B5%EC%8B%A0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95feat.-JSON

// json파일 fetch로 동적 가져오기 -- https://namhandong.tistory.com/99
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
