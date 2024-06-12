// let a = 4;
// console.log(a);
// // const result = functionToServer("url"); // 15ms
// function getData() {
//   return new Promise((res, rej) => {
//     const data = { name: "Alice" };
//     if (data) {
//       res(data);
//     } else {
//       rej();
//     }
//   });
// }
// getData()
//   .then((response) => {
//     console.log(response) // те данные которые передаются из resolve
//   })
//   .catch((error) => {
//     console.log(error) // те данные которые передаются из rejekt
//   });
// console.log(2);

// const myPromise = new Promise((res, rej) => {});

// console.log(myPromise);

// прототип то место где хранятся методы екземпляров типов данных(методы прототипа)

//

// //=============resolve==================

// Promise.resolve(value) —
// это метод, который возвращает промис, который был
// успешно разрешен с указанным значением. Если
// передается уже существующий промис, Promise.resolve
// возвращает его без изменений. Если передается объект
// (объект с методом then), Promise.resolve разрешает его в
// промис.

// const resolvePromise = Promise.resolve("successful");
// resolvePromise.then((result) => console.log(result));

// const myPromise2 = new Promise((res, rej)=>{
//      res("Alise")
// })

// const resolvePromise2 = Promise.resolve([33, 552, 25, "Alise"]);
// resolvePromise2.then((list) => {
//   list.forEach((el) => {
//     console.log(el);
//   });
// });

// //========reject===========

// Promise.reject(reason) —
// это метод, который возвращает промис, который
// был отклонен с указанной причиной (ошибкой).
// Обычно используется, когда возникает ошибка или
// невозможно выполнить обещание.

// const rejectPromise3 = Promise.reject("error")
// rejectPromise3.catch((error) => {

//       console.log(error);

//   });

// Использование Promise.resolve() и Promise.reject()

// ● Используются для создания исходных промисов
// ● Используются для обработки случаев успешного разрешения и отклонения в асинхронных операциях
// ● Полезны при обработке результатов асинхронных функций или при создании цепочек промисов

// ================= then.then , catch.catch (можно вызавать у них же их же)

// ===============Promise.all()===========

// для нескольких запросов сразу
// если один из промисов отклонён , вернётся ошибка и для всех остальныз
// если передать пустой масив , запрос обработается немедленно

// к примеру мы передаём данные авторизации на проверку и все должны быть верными
// в противном случае rejecte

// function getidData() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("123");
//     }, 1000);
//   });
// }

// function getidData2() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("456");
//     }, 2000);
//   });
// }

// function getidData3() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("789");
//     }, 3000);
//   });
// }

// const promiseAll = Promise.all([getidData(), getidData2(), getidData3()]).then(
//   (response) => {
//     const pass = response.reduce((acc, el) => acc + el, "");
//     console.log(pass); // те данные которые передаются из resolve
//   }
// );

// // ======================= Promise.allSettled()========================

// // возвращает масив обьектов (ключи (статус и наполнение))

// function getidData4() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("123");
//     }, 1000);
//   });
// }

// function getidData5() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       rej("error");
//     }, 2000);
//   });
// }

// function getidData6() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("789");
//     }, 3000);
//   });
// }
// const p2 = Promise.reject("error");

// const promiseAlllSettled = Promise.allSettled([
//   getidData4(),
//   getidData5(),
//   getidData6(),
//   p2,
// ]).then((response) => {
//   // const pass = response.reduce((acc,el)=> acc+el, "")
//   console.log(response); // те данные которые передаются из resolve
// });
// // (4) [{…}, {…}, {…}, {…}]
// // 0 :{status: 'fulfilled', value: '123'}
// // 1: {status: 'rejected', reason: 'error'}
// // 2: {status: 'fulfilled', value: '789'}
// // 3: {status: 'rejected', reason: 'error'}
// // length :  4
// // [[Prototype]]
// // :
// // Array(0)

// //==================Promise.any()================
// // вернет первый который первый зарезолвится
// // строка
// function getidData7() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(1);
//     }, 1000);
//   });
// }

// function getidData8() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       rej("error");
//     }, 2000);
//   });
// }

// function getidData9() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("789");
//     }, 3000);
//   });
// }
// // const p3 = Promise.reject("error")

// const promiseAlllSettled3 = Promise.any([
//   getidData7(),
//   getidData8(),
//   getidData9(),
//   p2,
// ]).then((response) => {
//   // const pass = response.reduce((acc,el)=> acc+el, "")
//   console.log(response); // те данные которые передаются из resolve
// });

// // ================== Promise.race()===========
// // первый пришедший промис (resolve / rejecte)
// const promiseAlllSettled4 = Promise.race([
//   getidData7(),
//   getidData8(),
//   getidData9(),

// ]).then((response) => {
//   // const pass = response.reduce((acc,el)=> acc+el, "")
//   console.log(response); // те данные которые передаются из resolve
// });

// ===============fetch=========================

// https://jsonplaceholder.typicode.com/ ( наш back)

// const url = "https://jsonplaceholder.typicode.com/posts" // масив обьектов

// const myBtn = document.querySelector(".btn")

// myBtn.addEventListener("click", ()=> {
//     fetch(url).then((response)=> {
//         return response.json()
//     }).then((data) => {
//         console.log(data);
//       });
// })

const myBtn = document.querySelector(".btn");

// const url = "https://jsonplaceholder.typicode.com/posts" // масив обьектов

// myBtn.addEventListener("click", ()=> {

//     //  fetch(url)
//     // .then((blabla)=> {
//     //     console.log(blabla.status)
//     // })

//     fetch(url).then((response)=> {
//         return response.json()
//     }).then((data) => {
//        for(let i = 0; i< data.length; i++){
//         let p = document.createElement("p")
//         document.body.append(p)
//         p.textContent = data[i].title
//        }
//       }).catch((error)=> {
//         alert( error)
//       })
// })

// const url2 = "https://jsonplaceholder.typicode.com/photos";

// myBtn.addEventListener("click", () => {
//   fetch(url2)
//     .then((response) => {
//       return response.json();
//     })
//     .then((list) => {
//       //   console.log(list);
//       list.length = 10;
//       for (let i = 0; i < list.length; i++) {

//         const photo = document.createElement("img");
//         document.body.append(photo);
//         photo.setAttribute("src", list[i].thumbnailUrl);
//       }
//     })
//     .catch((error) => {
//       alert(error);
//     });
// });



//  ===================== метод POST===============
// отправляет данные на сервер Payload в консоле

// const postsUrl = "https://jsonplaceholder.typicode.com/posts";

// const user = {
//     name: "Alice",
//     age:29,
//     isAdmin: true
// }

// myBtn.addEventListener("click", () => {
//   fetch(postsUrl, {
//     method: "POST", // Устанавливаем метод запроса POST
//     body: JSON.stringify(user), // ми используем бади как ту ерия из которой идет отправка // Преобразуем объект данных в строку JSON
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       }, // тип контента которые отправляются
//   });
// });

// //  ==================delete ===================
// myBtn.addEventListener("click", () => {
//   fetch("https://jsonplaceholder.typicode.com/posts/1", {
//     method: "DELETE", // Устанавливаем метод запроса DELETE
//   })
//     .then((response) => {
//       if (response.ok) {
//         // Проверяем, успешен ли ответ
//         console.log("Post deleted"); // Выводим сообщение об успешном удалении
//       } else {
//         console.error("Error:", response.statusText); // Выводим сообщение об ошибке
//       }
//     })
//     .catch((error) => console.error("Error:", error)); // Обрабатывает возможные ошибки
// });

// запрос из url строки 
// https://jsonplaceholder.typicode.com/users?username=Bret&eemail=Sincere@april.biz

// const url =
//   "https://jsonplaceholder.typicode.com/users?username=Bret&email=Sincere@april.biz";

// myBtn.addEventListener("click", () => {
//     fetch(url)
//   .then(response => response.json()) // Преобразует ответ в формат JSON
//   .then(user => console.log(user[0].name)) // Выводит данные в консоль
//   .catch(error => console.error('Error:', error)); // Обрабатывает возможные ошибки
// })

// =======================all metode
// // ### 1. GET
// // Используется для получения данных с сервера.

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json()) // Преобразует ответ в формат JSON
//   .then(data => console.log(data)) // Выводит данные в консоль
//   .catch(error => console.error('Error:', error)); // Обрабатывает возможные ошибки

// // ### 2. POST
// // Используется для отправки данных на сервер и создания нового ресурса.

// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST', // Устанавливаем метод запроса POST
//   headers: {
//     'Content-Type': 'application/json' // Указываем тип контента как JSON
//   },
//   body: JSON.stringify({ // Преобразуем объект данных в строку JSON
//     title: 'foo',
//     body: 'bar',
//     userId: 1
//   })
// })
//   .then(response => response.json()) // Преобразует ответ в формат JSON
//   .then(data => console.log(data)) // Выводит данные в консоль
//   .catch(error => console.error('Error:', error)); // Обрабатывает возможные ошибки


// // ### 3. PUT
// // Используется для обновления ресурса на сервере.

// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PUT', // Устанавливаем метод запроса PUT
//   headers: {
//     'Content-Type': 'application/json' // Указываем тип контента как JSON
//   },
//   body: JSON.stringify({ // Преобразуем объект данных в строку JSON
//     id: 1,
//     title: 'foo',
//     body: 'bar',
//     userId: 1
//   })
// })
//   .then(response => response.json()) // Преобразует ответ в формат JSON
//   .then(data => console.log(data)) // Выводит данные в консоль
//   .catch(error => console.error('Error:', error)); // Обрабатывает возможные ошибки

//   // ### 4. PATCH
// // Используется для частичного обновления ресурса на сервере.

// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PATCH', // Устанавливаем метод запроса PATCH
//   headers: {
//     'Content-Type': 'application/json' // Указываем тип контента как JSON
//   },
//   body: JSON.stringify({ // Преобразуем объект данных в строку JSON
//     title: 'updated title'
//   })
// })
//   .then(response => response.json()) // Преобразует ответ в формат JSON
//   .then(data => console.log(data)) // Выводит данные в консоль
//   .catch(error => console.error('Error:', error)); // Обрабатывает возможные ошибки

//   // ### 5. DELETE
// // Используется для удаления ресурса с сервера.

// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'DELETE' // Устанавливаем метод запроса DELETE
// })
//   .then(response => {
//     if (response.ok) { // Проверяем, успешен ли ответ
//       console.log('Post deleted'); // Выводим сообщение об успешном удалении
//     } else {
//       console.error('Error:', response.statusText); // Выводим сообщение об ошибке
//     }
//   })
//   .catch(error => console.error('Error:', error)); // Обрабатывает возможные ошибки
// ### Пояснение к коду
// Для каждого примера запросов происходит следующее:

// 1. URL: Указываем адрес ресурса, с которым взаимодействуем.
// 2. Метод: Определяем метод HTTP-запроса (GET, POST, PUT, PATCH, DELETE).
// 3. Заголовки: Включаем необходимые заголовки запроса, такие как Content-Type.
// 4. Тело запроса: Преобразуем данные в формат JSON и включаем их в тело запроса (для POST, PUT, PATCH).
// 5. Обработка ответа: Преобразуем ответ в формат JSON и выводим данные в консоль.
// 6. Обработка ошибок: Ловим и обрабатываем возможные ошибки, выводим их в консоль или показываем пользователю.

// Используя эти методы, можно выполнять различные операции над ресурсами на сервере, такие как получение данных, создание новых, обновление существующих или удаление.


//==========запрос на бек
// На бэкэнде мы можем использовать Node.js для выполнения асинхронных
// запросов к различным сервисам или базам данных. Ниже приведён пример,
// как можно симулировать параллельные запросы к нескольким сервисам и
// обрабатывать их с использованием Promise.all на сервере с
// помощью Node.js и встроенного модуля http для симуляции запросов.

// ### Пример кода на Node.js

// const http = require('http://127.0.0.1:5502/2_reg_form_14_hw/index.html');

// В Node.js require — это функция, используемая для импорта модулей.
// Модули могут быть встроенными в Node.js, сторонними (установленными
//     через npm) или пользовательскими (написанными вами).

// ### Пример использования require

// 1. Встроенные модули:
//    Node.js поставляется с набором встроенных модулей, таких как http,
// fs, path и другие. Вы можете импортировать их с помощью require.

//    const http = require('http'); // Встроенный модуль для создания HTTP-серверов и клиентов
//    const fs = require('fs');     // Встроенный модуль для работы с файловой системой

// 2. Сторонние модули:
//    Сторонние модули устанавливаются через npm и хранятся в папке
// node_modules. Например, популярный модуль express для создания веб-приложений.

//    const express = require('express'); // Импорт модуля Express
//    const bodyParser = require('body-parser'); // Импорт модуля body-parser для обработки тела HTTP-запросов

// 3. Пользовательские модули:
//    Пользовательские модули — это файлы, которые вы создаёте сами и
// экспортируете из них функции, объекты или другие значения. Вы можете
// импортировать их, используя относительные пути.

//    Например, у вас есть файл myModule.js:

//    // myModule.js
//    module.exports = {
//      greet: function(name) {
//        return `Hello, ${name}!`;
//      }
//    };

//    Вы можете импортировать этот модуль в другом файле:

//    const myModule = require('./myModule'); // Импорт пользовательского модуля
//    console.log(myModule.greet('World')); // Выведет: Hello, World!

// ### Как работает require

// 1. Загрузка модуля:
//    Когда require вызывается, Node.js ищет модуль по указанному пути.
// Если это встроенный модуль, Node.js загружает его сразу. Если это
// сторонний модуль, Node.js ищет его в папке node_modules. Если это
// пользовательский модуль, Node.js ищет файл по указанному относительному пути.

// 2. Кэширование:
//    Node.js кэширует загруженные модули. Если модуль уже загружен,
// Node.js не загружает его снова, а использует кэшированную версию.

// 3. Исполнение:
//    После нахождения модуля Node.js исполняет его код. Если модуль
// экспортирует какие-либо значения (используя module.exports или exports),
// эти значения возвращаются функцией require.

// ### Пример использования встроенных модулей

// В приведённом ранее примере мы использовали встроенный модуль http
// для создания HTTP-сервера:

// const http = require('http');

// // Создаём сервер
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// // Сервер прослушивает порт 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Server running at http://127.0.0.1:3000/');
// });
// Этот пример показывает, как легко можно использовать require
// для импортирования встроенных модулей и создания простого HTTP-сервера.

// // Симуляция асинхронного запроса к сервису
// function fetchData(hostname, path, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const options = {
//         hostname: hostname,
//         port: 80,
//         path: path,
//         method: 'GET'
//       };

//       const req = http.request(options, (res) => {
//         let data = '';

//         // Собираем данные
//         res.on('data', (chunk) => {
//           data += chunk;
//         });

//         // Обрабатываем завершение запроса
//         res.on('end', () => {
//           if (res.statusCode === 200) {
//             resolve(data);
//           } else {
//             reject(`Error: ${res.statusCode}`);
//           }
//         });
//       });

//       req.on('error', (e) => {
//         reject(`Request error: ${e.message}`);
//       });

//       req.end();
//     }, delay);
//   });
// }

// // Обработчик запросов сервера
// const server = http.createServer((req, res) => {
//   if (req.url === '/fetch-data') {
//     const request1 = fetchData('example.com', '/path1', 1000);
//     const request2 = fetchData('example.com', '/path2', 2000);
//     const request3 = fetchData('example.com', '/path3', 1500);

//     Promise.all([request1, request2, request3])
//       .then((results) => {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ data: results }));
//       })
//       .catch((error) => {
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end(`Error: ${error}`);
//       });
//   } else {
//     res.writeHead(404, {'Content-Type': 'text/plain'});
//     res.end('Not Found');
//   }
// });

// // Запуск сервера на порту 3000
// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000/');
// });
// ### Объяснение кода

// 1. **Функция fetchData**:
//    - Создаёт и возвращает Promise, который симулирует асинхронный запрос к указанному хосту и пути с задержкой.
//    - Использует встроенный модуль http для создания HTTP-запроса.
//    - Обрабатывает ответ сервера, собирает данные и завершает промис с результатом или ошибкой.
// Создание серверара**:
//    - Создаёт сервер, который слушает запросы на порту 3000.
//    - При получении запроса на /fetch-data, сервер выполняет три асинхронных запроса параллельно с помощью Promise.all.
//    - Если все запросы успешны, сервер возвращает собранные данные в формате JSON.
//    - Если любой из запросов завершается с ошибкой, сервер возвращает ошибку.

// Этот пример демонстрирует, как можно использовать Promise.all для управления несколькими асинхронными операциями на бэкэнде в Node.js.

//
//
