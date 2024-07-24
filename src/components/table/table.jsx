import { useState, useEffect } from "react";
import Row from "../row/row"; //компонент для вывода таблицы с пользователями
import Filter from "../filter/filter"; //компонент для поиска пользователей по введенному слову
import Modal from "../modal/modal"; //компонент для вывода popUp
import "./table.css";

//переменная для возврата всех пользователей после отмены фильтрации
let allUsers = [];

function Table() {
  //переменная для записи всех данных о пользователях
  const [users, setUser] = useState([]);

  const [modalUser, setModalUser] = useState({});

  const [modalStatus, setModalStatus] = useState(false);

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

  function openModal(id) {
    let user = allUsers.filter((user) => {
      return user.id === id;
    })[0];
    setModalUser({ ...user });
    setModalStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }
  
  return (
    <div>
      <h2 class="h2">Пользователи</h2>
      <Filter refreshUsers={refreshUsers} allUsers={allUsers} />
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Возраст</th>
              <th>Пол</th>
              <th>Номер телефона</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Row data={user} openModal={openModal} />
            ))}
          </tbody>
        </table>
      </div>
      {modalStatus&&<Modal modalUser={modalUser} closeModal={closeModal}/>}
    </div>
  );
}

export default Table;
