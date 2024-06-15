
// Получение элементов из DOM
const currentDate = document.querySelector(".currentDate");
const searchBar = document.querySelector(".searchBar");
const generationForm = document.querySelector(".generationForm");
const description = document.querySelector(".description");
const dateInput = document.querySelector(".date");

const listOfEntry = document.querySelector(".listOfEntry");
const filterButtons = document.querySelectorAll(".filterBtn");

// Функция для отображения текущей даты
function dateDisplay() {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-EN", { weekday: "long" });
  const dayOfMonth = today.toLocaleDateString("en-EN", { day: "numeric" });
  const month = today.toLocaleDateString("en-EN", { month: "long" });

  const formattedDate = `${dayOfWeek}<br>${dayOfMonth} ${month}`;

  currentDate.innerHTML = formattedDate;
}

// Функция генерации уникального ID
let taskIdCounter = 1;
function generateUniqueId() {
  return String(taskIdCounter++);
}

// Функция создания задачи и отображения её в списке задач
function createTask(task) {
  const liContainer = document.createElement("li"); // Создаем элемент списка
  const infoDiv = document.createElement("div"); // Создаем контейнер для информации о задаче
  infoDiv.classList.add("task-info");

  const taskData = document.createElement("p"); // Создаем элемент для даты задачи
  taskData.textContent = task.date;

  const taskTitle = document.createElement("h3"); // Создаем элемент для заголовка задачи
  taskTitle.textContent = task.description;

  const checkbox = document.createElement("input"); // Создаем чекбокс для отметки выполнения задачи
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  checkbox.checked = task.completed;

  infoDiv.append(taskData, taskTitle); // Добавляем дату и заголовок задачи в контейнер
  liContainer.append(infoDiv, checkbox); // Добавляем контейнер и чекбокс в элемент списка
  listOfEntry.append(liContainer); // Добавляем элемент списка в общий список задач

  // Обработка изменения состояния чекбокса
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked; // Обновляем статус выполнения задачи
    taskTitle.style.textDecoration = checkbox.checked ? "line-through" : "none"; // Перечеркиваем текст, если задача выполнена
    taskTitle.style.opacity = checkbox.checked ? 0.5 : 1; // Изменяем прозрачность текста, если задача выполнена
    const tasks = loadTasks(); // Загружаем текущие задачи из локального хранилища
    const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, completed: task.completed } : t); // Обновляем задачу в массиве задач
    saveTasks(updatedTasks); // Сохраняем обновленный массив задач в локальное хранилище
  });

  // Устанавливаем стиль перечеркивания и прозрачности при создании задачи
  taskTitle.style.textDecoration = task.completed ? "line-through" : "none";
  taskTitle.style.opacity = task.completed ? 0.5 : 1;
}

// Функция для сохранения задач в локальное хранилище
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция для загрузки задач из локального хранилища
function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Функция добавления новой задачи
function addTask(id, description, date) {
  const tasks = loadTasks();
  const newTask = {
    id: id,
    description: description,
    date: date,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
}

// Функция для отображения задач с учетом выбранного фильтра
function renderTasks(filter = "all") {
  listOfEntry.innerHTML = ""; // Очищаем текущий список задач
  const tasks = loadTasks(); // Загружаем задачи из локального хранилища


const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true; // Отображаем все задачи
    if (filter === "active") return !task.completed; // Отображаем только невыполненные задачи
    if (filter === "completed") return task.completed; // Отображаем только выполненные задачи
  });

  filteredTasks.forEach(task => {
    createTask(task); // Создаем элементы для каждой задачи
  });
}

// Обработка ввода в поле поиска
searchBar.addEventListener("input", (event) => {
  const tasksList = loadTasks(); // Загружаем задачи из локального хранилища
  const userInputValue = event.target.value; // Получаем значение, введенное пользователем
  searchTasks(tasksList, userInputValue); // Выполняем поиск задач
});

// Обработка нажатия на кнопки фильтрации
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter"); // Получаем значение фильтра из атрибута кнопки
    renderTasks(filter); // Перерисовываем задачи с учетом выбранного фильтра
  });
});

// Функция поиска задач
function searchTasks(tasksList, value) {
  const filteredTasks = tasksList.filter(task =>
    task.description.toLowerCase().includes(value.toLowerCase()) // Фильтруем задачи по введенному значению
  );

  listOfEntry.innerHTML = ""; // Очищаем текущий список задач

  if (filteredTasks.length > 0) {
    filteredTasks.forEach(task => {
      createTask(task); // Создаем элементы для каждой задачи
    });
  } else {
    listOfEntry.textContent = "Нет вариантов"; // Если задачи не найдены, отображаем сообщение
  }
}

// Инициализация даты и задач при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  dateDisplay(); // Отображаем текущую дату

  generationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    if (description.value === "" || dateInput.value === "") {
      alert("Fill in all fields"); // Проверка на пустые поля
    } else {
      const taskId = generateUniqueId(); // Генерация уникального ID для новой задачи
      addTask(taskId, description.value, dateInput.value); // Добавление новой задачи
      description.value = ""; // Очистка поля описания
      dateInput.value = ""; // Очистка поля даты
      renderTasks(); // Перерисовка задач
    }
  });

  dateInput.type = "text"; // Скрываем тип даты при загрузке страницы

  // При фокусировке на поле ввода даты
  dateInput.addEventListener("focus", () => {
    dateInput.type = "date";
    dateInput.click(); // Отобразить встроенный календарь
  });

  // При разфокусировке с поля ввода даты
  dateInput.addEventListener("blur", () => {
    setTimeout(() => {
      dateInput.type = "text";
    }, 100); // Задержка перед изменением типа поля ввода
  });

  renderTasks(); // Изначально отображаем все задачи
});


// ### Объяснение изменений:

// 1. Функция `createTask`:
//    - Упрощена структура: теперь все элементы создаются и добавляются в правильном порядке.
//    - Добавлено изменение прозрачности при отметке выполнения задачи.

// 2. Функция `renderTasks`:
//    - Отображает задачи в зависимости от выбранного фильтра.

// 3. Функция `addTask`:
//    - Добавляет новую задачу и сохраняет её в локальное хранилище.

// 4. Функция `searchTasks`:
//    - Обновлена, чтобы отфильтровывать задачи и отображать результаты непосредственно в списке задач.

// 5. Обработчики событий:
//    - Для кнопок фильтрации: обновлены для корректной работы с фильтрами.
//    - Для формы генерации задач: добавлена проверка на заполненность полей, генерация уникального ID, и очистка полей после добавления задачи.

// Этот код должен исправить все проблемы и сделать так, чтобы функционал фильтрации и поиска работал корректно, отображая задачи в соответствии с выбранными фильтрами и пользовательским вводом.