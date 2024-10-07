  
  //Задание 2.10
  
  /*2. Реализация запроса на получение данных (GET)
  Сделайте HTTP-запрос через XHR или fetch() к локальному серверу, чтобы
  получить список пользователей.
  Отобразите пользователей на странице в виде таблицы (имя, email).
  Подсказка: Используйте метод GET и преобразуйте полученные данные JSON в HTMLразметку.
  //отправка GET запроса на локальный сервер*/
  fetch('http://localhost:3000/users')
  .then(response => response.json()) //Преобразование ответа в JSON
  .then(data => {
      const usersList = document.getElementById("Users-list");
      
      //Создание списка пользователей
      data.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.name} (${user.email})`;
          usersList.appendChild(li);
      });
  })
  .catch(error => console.error("Ошибка:",error));

 /* 3. Отправка данных на сервер (POST)
Создайте форму на странице для добавления нового пользователя (имя и email).
При отправке формы сделайте запрос POST на сервер, чтобы добавить нового
пользователя в список.
Подсказка: Используйте объект FormData для получения данных из формы и
отправьте их на сервер через XHR или fetch() .*/

const form = document.getElementById('add-user-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();//Предотвращаем отправку формы по умолчанию
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
     //создаем объект пользователя
     const newUser = {
        name: name,
        email: email
     };

     //Оправляем POST запрос на сервер
     fetch("http://localhost:3000/users",{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(newUser) //Преобразуем объект в JSON-строку
})
.then(response =>response.json())
.then(data => {
    console.log('Пользователь добавлен:', data);
})
.catch(error => console.error("Ошибка:", error));
      
      });

      /*4. Обновление данных (PUT)
Добавьте к каждому пользователю кнопку "Редактировать".
При нажатии на кнопку поля имени и email должны становиться редактируемыми.
После редактирования сделайте запрос PUT на сервер, чтобы обновить данные
пользователя.
Подсказка: Для этого создайте форму или используйте уже существующую и сделайте
запрос с обновленными данными.*/

fetch("http://localhost:3000/users",{
    method: "PUT",
    headers:{
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        name: "Alice Updated",
        email: "alice.updated@example.com",
    }),
})
.then((response)=>response.json())
.then((data) => {console.log("Пользователь обновлен:", data);

})
.catch((error)=> console.error('Ошибка:',error));



/*6. Обработка ошибок
Обработайте сетевые ошибки при выполнении запросов (например, сервер
недоступен, неверный ответ).
Отображайте соответствующее сообщение об ошибке на странице при возникновении
ошибки.
Подсказка: Используйте блоки try-catch или методы .catch() в fetch() для
обработки ошибок и отображения их пользователю.*/

fetch("http://localhost:3000/users")
.then((response)=>{
    if(!response.ok) {
        throw new Error('Сетевая ошибка');
    }
    return response.json();
})
.then((data)=> console.log(data))
.catch((error)=> console.error ("Ошибка:", error));
