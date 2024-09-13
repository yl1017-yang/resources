// es6 클래스 문법  -> TodoApp 클래스를 정의
class TodoApp {
  constructor() {
    this.todoBtn = document.querySelector('.btn-todo');
    this.todoInput = document.querySelector('.todo-input');
    this.todoList = document.querySelector('.todo-list');
    this.clearAllBtn = document.querySelector('.all-delete');
    const { todoItems, masterKey } = this.getTodos();
    this.todoItems = todoItems;
    this.masterKey = masterKey;

    this.initialize();  // 이벤트 리스너를 설정하고 초기 로딩 시 할 일 목록을 렌더링
  }


  // 로컬 스토리지에서 데이터 불러오기 -> 로컬 스토리지에서 저장된 할 일 항목을 불러와 초기화, masterKey는 각 할 일 항목의 고유 ID를 관리
  getTodos() {
    let todoItems = [];
    let masterKey = parseInt(localStorage.getItem('masterKey')) || 0;

    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'masterKey') {
          const item = JSON.parse(localStorage.getItem(key));
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
  setTodos() {
    const todoId = this.masterKey++;
    const todoItem = this.todoInput.value;

    const obj = {
      completed: false,
      id: todoId,
      item: todoItem,
      todayDate: new Date().toISOString().substring(0, 10),
      editMode: false,
    };

    console.log(todoId, todoItem, obj.todayDate);
    
    // 내용 중복값 체크
    if (!this.todoItems.some(data => data.item === todoItem)) {
      this.todoItems.push(obj);
      this.todoItems.sort((a, b) => a.id - b.id);

      localStorage.setItem(todoId, JSON.stringify(obj));
      localStorage.setItem('masterKey', this.masterKey);
    } else {
      alert('동일 내용이 있슈! 다른 내용으로 입력해주!');
    }

    return obj;
  }

  // 할 일 렌더링 -> 할 일 항목을 HTML 요소로 생성하고 화면에 추가. 체크박스 이벤트 리스너를 추가하여 완료 상태를 토글
  appendTodos(todo, index) {
    const todoElement = document.createElement('li');
    todoElement.setAttribute('data-id', todo.id);
    todoElement.innerHTML = `
      <div><input type="checkbox" id="check${todo.id}" ${todo.completed ? 'checked' : ''}/><label for="check${todo.id}"></label></div>
      <div class="num">${index + 1}</div>
      <div class="list">${todo.item}</div>
      <div class="date">${todo.todayDate}</div>
      <div class="btn-wrap">
        <button class="btn btn-graya" onclick="app.editTodos(${todo.id})">수정</button>
        <button class="btn btn-red" onclick="app.removeTodos(${todo.id})">삭제</button>
      </div>
    `;

    const checkbox = todoElement.querySelector(`#check${todo.id}`);
    checkbox.addEventListener('change', () => this.toggleTodoCompletion(todo.id));

    this.todoList.appendChild(todoElement);
  }

  // 할 일 완료 토글 -> 할 일 항목의 완료 상태를 토글. 완료 상태를 로컬 스토리지에 업데이트하고, 화면을 다시 렌더링
  toggleTodoCompletion(id) {
    const todo = this.todoItems.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      localStorage.setItem(id, JSON.stringify(todo));
      this.indexTodos();
    }
  }

  // 할 일 삭제 -> 로컬 스토리지에서 해당 할 일 항목을 삭제하고, 화면을 다시 렌더링
  removeTodos(id) {
    localStorage.removeItem(id);
    this.todoItems = this.todoItems.filter(todo => todo.id !== id);
    this.indexTodos();
  }

  // 할 일 수정 -> 할 일 항목을 수정모드로 전환
  editTodos(id) {
    const todo = this.todoItems.find(todo => todo.id === id);
    if (todo) {
      const todoElement = document.querySelector(`li[data-id='${id}']`);
      todoElement.innerHTML = `
        <div><input type="checkbox" id="check${todo.id}" ${todo.completed ? 'checked' : ''}/><label for="check${todo.id}"></label></div>
        <div class="num">${this.todoItems.indexOf(todo) + 1}</div>
        <div class="list"><input type="text" class="edit-input" value="${todo.item}"/></div>
        <div class="date">${todo.todayDate}</div>
        <div class="btn-wrap">
          <button class="btn btn-green" onclick="app.saveEdit(${todo.id})">저장</button>
          <button class="btn btn-graya" onclick="app.cancelEdit()">취소</button>
        </div>
      `;

      const checkbox = todoElement.querySelector(`#check${todo.id}`);
      checkbox.addEventListener('change', () => this.toggleTodoCompletion(todo.id));
    }
  }

  // 할 일 수정 -> 수정된 내용을 저장
  saveEdit(id) {
    const todoElement = document.querySelector(`li[data-id='${id}']`);
    const editInput = todoElement.querySelector('.edit-input');
    const newValue = editInput.value.trim();

    if (newValue) {
      const todo = this.todoItems.find(todo => todo.id === id);
      if (todo) {
        todo.item = newValue;
        localStorage.setItem(id, JSON.stringify(todo));
        this.indexTodos();
      }
    } else {
      alert('수정 내용을 입력해유~');
    }
  }

  // 할 일 수정 -> 수정 모드를 취소하고 화면을 다시 렌더링
  cancelEdit() {
    this.indexTodos();
  }

  // 전체 삭제 -> 모든 할 일 항목을 삭제하고, masterKey를 초기화
  clearAll() {
    localStorage.clear();
    localStorage.setItem('masterKey', 0);
    this.masterKey = 0;
    this.todoItems = [];
    this.todoList.innerHTML = '';
  }

  // 할 일 목록 렌더링 -> 현재 할 일 목록을 화면에 다시 렌더링
  indexTodos() {
    this.todoList.innerHTML = '';
    this.todoItems.forEach((todo, index) => this.appendTodos(todo, index));
  }


  initialize() {
    // 초기 로딩 및 이벤트 리스너 - > 페이지가 로드될 때 할 일 목록을 렌더링
    document.addEventListener('DOMContentLoaded', () => {
      this.indexTodos();
    });

    // 초기 로딩 및 이벤트 리스너 - > 할 일 항목을 추가
    this.todoBtn.addEventListener('click', () => {
      if (this.todoInput.value) { 
        this.setTodos();
        this.indexTodos();
        this.todoInput.value = '';
      } else {
        alert('click 내용이 없구만요. 입력해봐유~~~');
      }
    });

    // 초기 로딩 및 이벤트 리스너 - > 키보드 입력 이벤트 리스너는 엔터 키를 눌렀을 때 할 일 항목을 추가
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (this.todoInput.value) {
          this.setTodos();
          this.indexTodos();
          this.todoInput.value = '';
        } else {
          alert('keypress 내용이 없구만요. 입력해봐유~~~');
        }
      } 
    });

    // 전체삭제 이벤트 리스너
    this.clearAllBtn.addEventListener('click', () => this.clearAll());
  }
}

// app 인스턴스를 생성하여 애플리케이션을 실행
const app = new TodoApp();
