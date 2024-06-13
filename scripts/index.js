const currentDate = document.querySelector(".currentDate");
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn")
const generationForm = document.querySelector(".generationForm")
const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector(".clearBtn");
const listOfEntry = document.querySelector("listOfEntry");
const filterButtons = document.querySelectorAll(".filterBtn");
const dateInput = document.querySelector(".date");
const editBtn = document.querySelector(".editBtn");

generationForm.addEventListener("click", (event) => {
  event.preventDefault()
})
// document.addEventListener('DOMContentLoaded', () => {

//   let todos = JSON.parse(localStorage.getItem('todos')) || [];
//   let filter = 'all';

//   const today = new Date();
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   currentDate.textContent = today.toLocaleDateString('ru-RU', options);

//   dateInput.addEventListener('input', () => {
//     const value = dateInput.value;
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!regex.test(value)) {
//       dateInput.setCustomValidity('Формат даты должен быть ГГГГ-ММ-ДД');
//     } else {
//       dateInput.setCustomValidity('');
//     }
//   });

//   const renderTodos = () => {
//     todoList.innerHTML = '';
//     const filteredTodos = todos.filter(todo => {
//       if (filter === 'all') return true;
//       if (filter === 'active') return !todo.completed;
//       if (filter === 'completed') return todo.completed;
//       return false;
//     }).filter(todo => todo.description.toLowerCase().includes(searchBar.value.toLowerCase()));

//     filteredTodos.forEach(todo => {
//       const li = document.createElement('li');
//       li.className = `todo-item ${todo.completed ? 'completed' : ''};
//       li.innerHTML =
//         <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${todo.id})">
//         <span>${todo.description} (${todo.date})</span>
//         <div class="todo-actions">
//           <button onclick="editTodo(${todo.id})">Редактировать</button>
//           <button onclick="deleteTodo(${todo.id})">Удалить</button>
//         </div>
//       `;
//       todoList.appendChild(li);
//     });
//   };

// addBtn.addEventListener('click', () => {
//     const description = document.getElementById('description').value;
//     const date = document.getElementById('date').value;
//     const regex = /^\d{4}-\d{2}-\d{2}$/;

//     if (description && regex.test(date)) {
//       const newTodo = { id: Date.now(), description, date, completed: false };
//       todos.push(newTodo);
//       localStorage.setItem('todos', JSON.stringify(todos));
//       renderTodos();
//       document.getElementById('description').value = '';
//       document.getElementById('date').value = '';
//     } else {
//       alert('Пожалуйста, введите корректное описание и дату в формате ГГГГ-ММ-ДД');
//     }
//   });

//   clearBtn.addEventListener('click', () => {
//     todos = [];
//     localStorage.setItem('todos', JSON.stringify(todos));
//     renderTodos();
//   });

//   filterButtons.forEach(button => {
//     button.addEventListener('click', (e) => {
//       filter = e.target.dataset.filter;
//       filterButtons.forEach(btn => btn.classList.remove('active'));
//       e.target.classList.add('active');
//       renderTodos();
//     });
//   });

//   searchBar.addEventListener('input', renderTodos);

//   window.toggleComplete = (id) => {
//     todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
//     localStorage.setItem('todos', JSON.stringify(todos));
//     renderTodos();
//   };

//   window.editTodo = (id) => {
//     const todo = todos.find(todo => todo.id === id);
//     const newDescription = prompt('Редактировать описание', todo.description);
//     const newDate = prompt('Редактировать дату (ГГГГ-ММ-ДД)', todo.date);
//     const regex = /^\d{4}-\d{2}-\d{2}$/;

//     if (newDescription && regex.test(newDate)) {
//       todos = todos.map(todo => todo.id === id ? { ...todo, description: newDescription, date: newDate } : todo);
//       localStorage.setItem('todos', JSON.stringify(todos));
//       renderTodos();
//     } else {
//       alert('Пожалуйста, введите корректное описание и дату в формате ГГГГ-ММ-ДД');
//     }
//   };

// window.deleteTodo = (id) => {
//     todos = todos.filter(todo => todo.id !== id);
//     localStorage.setItem('todos', JSON.stringify(todos));
//     renderTodos();
//   };

//   renderTodos();
// });
