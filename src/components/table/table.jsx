import { useState, useEffect } from "react";
import Row from "../row/row"; //компонент для вывода таблицы с пользователями
import Filter from "../filter/filter"; //компонент для поиска пользователей по введенному слову
import Modal from "../modal/modal"; //компонент для вывода popUp
import './table.css'

//переменная для возврата всех пользователей после отмены фильтрации
let allUsers = [];


function Table() {
  //переменная для записи всех данных о пользователях
  const [users, setUser] = useState([]);

  const [modalUser, setModalUser] = useState({});

  // хук для получения данных с dummyjson, с увилечением "limit" для получения всех пользователей
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=2000")
      .then((res) => res.json())
      .then((json) => {
        setUser(json.users);

        allUsers = json.users;
        
        });
  }, []);

  //функция обновления переменной users, для занесения в нее, отфильтрованных по введенному слову, пользователей
  function refreshUsers(users) {
    setUser(users);
  }

  function userId(id){
    let user = allUsers.filter((user) => {
        return user.id===id
    })[0]
    setModalUser({...user})
  }
 
  return (
    <div>
      <h2>Пользователи</h2>
      <Filter refreshUsers={refreshUsers} allUsers={allUsers} />
      <div class="table-responsive small">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ФИО</th>
              <th scope="col">Возраст</th>
              <th scope="col">Пол</th>
              <th scope="col">Номер телефона</th>
              <th scope="col">Адрес</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Row data={user} userId={userId} />
            ))}
            </tbody>
        </table>
      </div>
      <Modal modalUser={modalUser} />
    </div>
  );
}

export default Table;
