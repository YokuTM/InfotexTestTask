import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    fetch("https://dummyjson.com/users/" + index)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  
  
  return (
    <div>
      <h2>Пользователи</h2>
      <div class="table-responsive small">
        <table class="table table-striped table-sm table-bordered">
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
            <tr>
              <td>
                {data.firstName} {data.lastName} {data.maidenName}
              </td>
              <td>{data.age}</td>
              <td>{data.gender}</td>
              <td>{data.phone}</td>
              <td>{data.address.city}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
