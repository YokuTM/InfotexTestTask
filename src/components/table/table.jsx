import  { useState, useEffect } from "react";
import Row from "../row/row";
import Filter from "../filter/filter";
 
 function Table() {
    const [users, setUser] = useState([]);
    // const [filter, setFilter] = useState(['/filter?key=lastName&value=Johnson'])
      useEffect(() => {
        fetch("https://dummyjson.com/users?limit=208")
          .then((res) =>  res.json())
          .then((json) => {
            setUser(json.users)
            console.log(json.users)
          });
      }, []);
      console.log()
      //filter?key=gender&value=female
      //?skip=30

    return (
        <div>
      <h2>Пользователи</h2>
      <Filter />
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
            {users.map((user)=> 
              <Row data= {user} />
            )}
          
          </tbody>
        </table>
      </div>
    </div>
    );
}

export default Table