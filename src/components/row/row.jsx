function Row(props) {
  return (
    <tr>
      <td>
        {props.data.firstName} {props.data.lastName} {props.data.maidenName}
      </td>
      <td>{props.data.age}</td>
      <td>{props.data.gender}</td>
      <td>{props.data.phone}</td>
      <td>
        {props.data.address.city}, {props.data.address.address}
      </td>
    </tr>
  );
}

export default Row;
