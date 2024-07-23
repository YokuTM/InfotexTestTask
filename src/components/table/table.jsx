import { useState, useEffect } from "react";
import Row from "../row/row";
import Filter from "../filter/filter";

let allUsers = [];
function Table() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=208")
      .then((res) => res.json())
      .then((json) => {
        setUser(json.users);

        allUsers = json.users;
        console.log(allUsers);
      });
  }, []);

  function refreshUsers(users) {
    setUser(users);
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
              <Row data={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
