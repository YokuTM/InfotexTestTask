import { useState, useEffect } from "react";
import Row from "../row/row"; //компонент для вывода таблицы с пользователями
import Filter from "../filter/filter"; //компонент для поиска пользователей по введенному слову
import Modal from "../modal/modal"; //компонент для вывода popUp
import Column from "../column/column"; //компонент для вывода названия колонки
import "./table.css";


//переменная для возврата всех пользователей после отмены фильтрации
let allUsers = [];

//функция для добавления поля city в объект user
function resolveDependency(users) {
  users.forEach(element => {
      element.city = element.address.city
  });
  return users
}

function Table() {
  //состояние для отфильтрованных users
  const [users, setUsers] = useState([]);

  //состояние для отсортированных users, которых мы отображаем 
  const [displayUsers, setDisplayUsers] = useState([]);

  //данные, выбранного user, для модального окна
  const [modalUser, setModalUser] = useState({});

  //состояние модального окна
  const [modalStatus, setModalStatus] = useState(false);

 
  //типы сортировки по умолчанию
  let defaultSortTypes = {
    firstName: {asc: false, desc: false}, 
    age: {asc: false, desc: false}, 
    gender: {asc: false, desc: false}, 
    city: {asc: false, desc: false},
    default: true  
  };

  //типы сортировки
  const [sortingType, setSortingType] = useState(defaultSortTypes);
  
  // хук для получения данных с dummyjson, с увилечением "limit" для получения всех пользователей
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=2000")
      .then((res) => res.json())
      .then((json) => {   
        setUsers(resolveDependency(json.users));
        allUsers = json.users;
      });
  }, []);

  useEffect(() =>{
    setDisplayUsers([...sortUsers()])
  }, [users,sortingType])

  
  function sortUsers() {
    let typeSort = ''
    let keySort = ''
  
    if (sortingType.default){
      typeSort = "default"
    } else {
      let updateObj = {...sortingType}
      delete updateObj.default
    
      Object.keys(updateObj).forEach((key) => {
        Object.keys(sortingType[key]).forEach((type) => {
          if(sortingType[key][type]) {
            typeSort = type
            keySort = key
          }
        })
      })
    }
  
    let showUsers = [...users]
    //сортировка по возрастанию
    if (typeSort === "asc") {
      showUsers.sort(function(a, b) {
        if (a[keySort] < b[keySort]) {
          return -1;
        }
        if (a[keySort] > b[keySort]) {
          return 1;
        }
        return 0;
      })
      //сортировка по убыванию
    } else if(typeSort === "desc") {
      showUsers.sort(function(a, b) {
        if (a[keySort] > b[keySort]) {
          return -1;
        }
        if (a[keySort] < b[keySort]) {
          return 1;
        }
        return 0;
      })
    } 
      return showUsers

  }

  

  //функция обновления переменной users, для занесения в нее, отфильтрованных по введенному слову, пользователей
  function refreshUsers(users) {
    setUsers(resolveDependency(users));
  }

  //функция открытия модального окна
  function openModal(id) {
    let user = allUsers.filter((user) => {
      return user.id === id;
    })[0];
    setModalUser({ ...user });
    setModalStatus(true);
  }

  //функция закрытия модального окна
  function closeModal() {
    setModalStatus(false);
  }
  
  //функция сброса состояния сортировки
  function resetSortingParam() {
    sortingType["default"] = false

    let obj = {...sortingType}
    delete obj.default
    
    Object.keys(obj).forEach((keySort) => {
      Object.keys(sortingType[keySort]).forEach((typeSort) => {
        sortingType[keySort][typeSort] = false
      })
    })
    
  }

  //функция изменения параметров сортировки
  function changeSortingParam(event, type) {
    resetSortingParam()
    let keySort = event.target.name
    if(type === "default") {
      sortingType.default = true
    } else {
      sortingType[keySort][type] = true
    }
    setSortingType({...sortingType})
  }

  
  return (
    <div>
      <h2 class="h2">Пользователи</h2>
      <Filter refreshUsers={refreshUsers} allUsers={allUsers} />
      <div>
        <table class="table">
          <thead>
            <tr>
              <Column systemName={'firstName'} displayName={"ФИО"} changeSortingParam={changeSortingParam}/>
              <Column systemName={'age'} displayName={"Возраст"} changeSortingParam={changeSortingParam}/>
              <Column systemName={'gender'} displayName={"Пол"} changeSortingParam={changeSortingParam}/>
              <th>Номер телефона</th>
              <Column systemName={'city'} displayName={"Адрес"} changeSortingParam={changeSortingParam}/>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user) => (
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
