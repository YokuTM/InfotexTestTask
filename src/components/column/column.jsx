function Column(props) {
    function sorting(key,type) {
        props.changeSortingParam(key,type)
    }
    
    return (
        <th>{props.displayName}
        <div>
          <button type="asc" name={props.systemName} onClick={(event) => {sorting(event,"asc")}}>▲</button>
          <button type="desc" name={props.systemName} onClick={(event) => {sorting(event,"desc")}}>▼</button>
          <button type="default" name={props.systemName} onClick={(event) => {sorting(event,"default")}}>×</button>
        </div>
      </th>
    );
  }
  
  export default Column;
  