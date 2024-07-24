const todoBtn = document.querySelector('.btn-todo');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

const p = document.querySelector('.todo-content');

let masterKey = 0;
let totoData = [];

todoBtn.addEventListener('click', (e) => {
  if ( todoInput.value ) {
    appendTodos(todoInput.value);
  } else {
    alert('입력해봐유~~~');
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    appendTodos(todoInput.value);
    console.log('keypress');
  }
});

const appendTodos = (text) => {
  const newMasterKey = masterKey++;  
  todoInput.value = '';

  listTodos(text);
}

const listTodos = (text) => {
  p.innerText += ` ${text}`;

  todoList.innerHTML = '';
}



// fetch API
fetch('./js/data.json') // URL fetch 요청
	.then((response) => response.json()) // Fetch 응답 객체를 받아옴
	.then((json) => console.log(json)); // 응답 객체가 JSON -> 순수 JS 객체로 변환


  let obj = JSON.parse(json);
  console.log(obj.date.getDate());









// 참고내용들
// 버튼 클릭 https://blogcreator.blog/post/1
// https://min88.tistory.com/entry/TIL-%F0%9F%92%A1-Day-9-JavaScript%EB%A1%9C-TodoList-%EB%A7%8C%EB%93%A4%EA%B8%B0
// https://woojong92.tistory.com/entry/JS-%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-ToDo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0-2-%ED%95%A0-%EC%9D%BC-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0

// https://velog.io/@rlorxl/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%84%9C%EB%B2%84%EC%99%80-%ED%86%B5%EC%8B%A0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95feat.-JSON
