import {useRef} from 'react';

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

  //константа для очиски Input
  const ref = useRef(null);

  //поиск информации из колонов по всей таблице
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

  //Input и кнопка возврата к исходному состоянию
  return (
    <div class="row g-2 mb-1">
      <div class="col-auto">
        <input
          ref={ref}
          onKeyDown={checkInput}
          type="text"
          placeholder="Поиск"
          class="form-control"
        />
      </div>
      <div class="col-auto">
        <button
          onClick={getAllUsers}
          type="button"
          class="btn btn-outline-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Filter;
