import {useRef} from 'react';
import "./filter.css"
import Close from "./close.png"

function Filter(props) {
  // filters передает значения для поиска, чтобы перебрать искомое значение по всем столбцам
  const filters = [
    "firstName",
    "lastName",
    "maidenName",
    "age",
    "gender",
    "phone",
    "address.city",
    "address.address",
  ];

  //ссылка на поиск
  const ref = useRef(null);

  //поиск информации из колонок по всей таблице
  function getPromisesFilteredUsers(value) {
    const promises = [];
    filters.forEach((parametr) => {
      promises.push(
        fetch(
          `https://dummyjson.com/users/filter?key=${parametr}&value=${value}`
        )
      );
    });
    return promises;
  }

  //получение отфильтрованных пользователей
  function getFilterUsers(value) {
    const jsons = [];
    Promise.allSettled(getPromisesFilteredUsers(value)).then((promises) => {
      promises.forEach((promise) => {
        jsons.push(promise.value.json());
      });
      Promise.allSettled(jsons).then((json) => {
        let users = [];
        json.forEach((data) => {
          users.push(...data.value.users);
        });
        props.refreshUsers(users);
      });
    });
  }

  //отслеживание нажатия Enter
  function checkInput(event) {
    if (event.code === "Enter") {
      getFilterUsers(event.nativeEvent.target.value);
      }
  }

  //очистка фильтра
  function getAllUsers() {
    
    props.refreshUsers(props.allUsers);
    ref.current.value = '';
  }

  return (
    <div className='filter'>
        <input
          ref={ref}
          onKeyDown={checkInput}
          type="text"
          placeholder="Поиск"
        />
        <button
          onClick={getAllUsers}
          type="button"
        >
          <img src={Close} alt="" vertical-align="middle" width='15vw' height='16vh'/>
        </button>
    </div>
  );
}

export default Filter;
