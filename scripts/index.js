
const currentDate = document.querySelector(".currentDate"); // Находим элемент для текущей даты
const searchBar = document.querySelector(".searchBar"); // Находим элемент поисковой строки
const searchBtn = document.querySelector(".searchBtn"); // Находим кнопку поиска
const generationForm = document.querySelector(".generationForm"); // Находим форму создания задач
const description = document.querySelector(".description"); // Находим поле для ввода описания задачи
const date = document.querySelector(".date"); // Находим поле для ввода даты

const addBtn = document.querySelector(".addBtn"); // Находим кнопку добавления задачи
const clearBtn = document.querySelector(".clearBtn"); // Находим кнопку очистки формы
const listOfEntry = document.querySelector(".listOfEntry"); // Находим список задач
const filterButtons = document.querySelectorAll(".filterBtn"); // Находим все кнопки фильтров
const editBtn = document.querySelector(".editBtn"); // Находим кнопку редактирования задачи
// const searchResults = document.querySelector(".searchResults"); // Находим элемент для результатов поиска



// Функция отображения текущей даты
function dateDisplay() {
  const today = new Date(); // Создаем объект текущей даты
  const dayOfWeek = today.toLocaleDateString("en-EN", { weekday: "long" }); // Получаем день недели
  const dayOfMonth = today.toLocaleDateString("en-EN", { day: "numeric" }); // Получаем день месяца
  const month = today.toLocaleDateString("en-EN", { month: "long" }); // Получаем название месяца

  const formattedDate = `${dayOfWeek}<br>${dayOfMonth} ${month}`; // Форматируем строку даты

  currentDate.innerHTML = formattedDate; // Отображаем текущую дату
}

// Функция создания задачи
function createTask(task) {
  const liContainer = document.createElement("li"); // Создаем элемент списка
  const checkbox = document.createElement("input"); // Создаем элемент чекбокса
  const taskTitle = document.createElement("h3"); // Создаем элемент заголовка задачи
  const taskData = document.createElement("p"); // Создаем элемент для отображения даты задачи

  taskTitle.textContent = task.description; // Устанавливаем текст заголовка задачи
  taskData.textContent = task.date; // Устанавливаем текст даты задачи
  checkbox.setAttribute("type", "checkbox"); // Устанавливаем тип элемента как чекбокс
  checkbox.classList.add("checkbox"); // Добавляем класс чекбоксу
  taskTitle.classList.add("task-title"); // Добавляем класс заголовку задачи

  liContainer.append(checkbox, taskTitle, taskData); // Добавляем чекбокс, заголовок и дату в элемент списка
  listOfEntry.append(liContainer); // Добавляем элемент списка в список задач

  // Обработка изменения состояния чекбокса
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked; // Обновляем статус выполнения задачи
    taskTitle.style.textDecoration = checkbox.checked ? "line-through" : "none"; // Перечеркиваем текст, если задача выполнена
    saveTasks(); // Сохраняем задачи в localStorage
  });
}

// Функция генерации уникального ID
let taskIdCounter = 1; // Глобальная переменная для хранения текущего номера задачи
function generateUniqueId() {
  return String(taskIdCounter++); // Возвращаем текущий номер задачи и увеличиваем его на 1
}

// Функция сохранения задач в localStorage
function saveTasks() {
  const tasks = Array.from(listOfEntry.children).map(li => {
    const checkbox = li.querySelector(".checkbox"); // Находим чекбокс
    const taskTitle = li.querySelector("h3").textContent; // Находим заголовок задачи
    const taskData = li.querySelector("p").textContent; // Находим дату задачи
    return {
      id: generateUniqueId(), // Генерируем уникальный ID для задачи
      description: taskTitle, // Получаем описание задачи
      date: taskData, // Получаем дату задачи
      completed: checkbox.checked, // Получаем статус выполнения задачи
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Сохраняем задачи в localStorage
}


// Функция загрузки задач из localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Получаем задачи из localStorage
  tasks.forEach(createTask); // Создаем задачи из localStorage
}

// Функция добавления новой задачи
function addTask(description, date) {
  const task = {
    id: generateUniqueId(), // Генерируем уникальный ID для задачи
    description: description, // Устанавливаем описание задачи
    date: date, // Устанавливаем дату задачи
    completed: false, // Устанавливаем статус выполнения задачи
  };
  createTask(task); // Создаем задачу
  saveTasks(); // Сохраняем задачи в localStorage
}

// Функция поиска задач
function searchTasks(tasksList, value) {
    const filteredTasks = tasksList.filter(task =>
        task.description.toLowerCase().includes(value.toLowerCase()) // Фильтруем задачи по введенному значению
    );
    listOfEntry.innerHTML = ""; // Очищаем предыдущие задачи

    if (filteredTasks.length > 0) {
        filteredTasks.forEach(createTask);
    } else {
        const noResults = document.createElement("li");
        noResults.textContent = "Нет вариантов";
        listOfEntry.appendChild(noResults);
    }
}

document.addEventListener("DOMContentLoaded", () => {
  dateDisplay(); // Отображаем текущую дату
  loadTasks(); // Загружаем задачи из localStorage

  generationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (description.value === "" || date.value === "") {
      alert("Fill in all fields"); // Проверяем, что все поля заполнены
    } else {
      addTask(description.value, date.value); // Добавляем новую задачу
      description.value = ""; // Очищаем поле описания
      date.value = ""; // Очищаем поле даты
    }
  });

  date.type = "text"; // Скрываем дату при загрузке страницы

  // При фокусировке на поле ввода даты
  date.addEventListener("focus", () => {
    date.type = "date"; // Изменяем тип поля на "date"
    date.click(); // Отображаем встроенный календарь
  });

  // При разфокусировке с поля ввода даты
  date.addEventListener("blur", () => {
    setTimeout(() => {
      date.type = "text"; // Возвращаем тип поля на "text"
    }, 100); // Задержка перед изменением типа поля ввода
  });

  searchBar.addEventListener("input", (event) => {
    const userInputValue = event.target.value;
    const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
    searchTasks(tasksList, userInputValue);
});

searchBtn.addEventListener("click", () => {
    const userInputValue = searchBar.value;
    const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
    searchTasks(tasksList, userInputValue);
});
});
