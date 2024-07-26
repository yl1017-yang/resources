const todoBtn = document.querySelector('.btn-todo');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

const p = document.querySelector('.todo-content');  // 내용 받기

let masterKey = 0;
let todos = [];

const getAllTodos = () => {
  return todos;
}

const appendTodos = (item) => {
  p.innerText += ` ${item}`;

  const allTodos = getAllTodos();
  allTodos.forEach(todo => {
    const todoLiElem = document.createElement('li');
    const todoDivElem = document.createElement('div');
    todoElem.classList.add('list');
    todoElem.innerText = todo.item;

    todoLiElem.appendChild(todoLiElem);
    todoLiElem.appendChild(todoDivElem);
  });

  // todoList.innerHTML += `
  //   <li>
  //     <div class="num">${todos.id}</div>
  //     <div class="list">${todos.item}</div>
  //     <div class="date">${todos.todayDate}</div>
  //   </li>
  // `;
}

todoBtn.addEventListener('click', (e) => {
  if ( todoInput.value ) {
  
    const todoId = masterKey++;
    const todoItem = todoInput.value;

    const obj = [...getAllTodos(), 
      {
        completed: false,
        id: todoId,
        item: todoItem,
        todayDate: new Date().toISOString().substring(0, 10),
      }
    ]


    console.log(todoId, todoItem, obj.todayDate);
    
    const objString = JSON.stringify(obj);
    localStorage.setItem(todoId, objString);
    todos.push(obj.id);

    todoInput.value = '';
    appendTodos(todoInput.value);

  } else {
    alert('입력해봐유~~~');
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    todoInput.value = '';
    appendTodos(todoInput.value);
    console.log('keypress');
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
//   showTodoList(items); 
// });

// function showTodoList(items) {
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
