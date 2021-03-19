import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersStyles } from "./UsersStyled";

const arrayHeader = [
  { title: "Имя", placeholder: "Введите имя" },
  { title: "Фамилия", placeholder: "Введите фамилию" },
  { title: "Возраст", placeholder: "Введите возраст" },
  // { title: "Пол", placeholder: "Введите имя" },
];

function Users() {
  const [userData, setUserData] = useState([]);

  const onHandleCheck = () => {};

  useEffect(() => {
    axios
      .get("https://venbest-test.herokuapp.com/")
      .then((res) => setUserData(res.data));
  }, []);

  return (
    <UsersStyles>
      <table>
        <tbody>
          <tr className="tableHeader">
            {arrayHeader.map((arrHeader) => (
              <th key={arrHeader.title}>
                {arrHeader.title}
                <br />
                <input placeholder={arrHeader.placeholder} />
              </th>
            ))}
            <th>
              Пол
              <br />
              <label className="firstOfTypeSex">
                мужчины
                <input
                  type="checkbox"
                  name="sex"
                  checked={""}
                  onChange={onHandleCheck}
                />
              </label>
              <label>
                женщины
                <input
                  type="checkbox"
                  name="sex"
                  checked={""}
                  onChange={onHandleCheck}
                />
              </label>
            </th>
          </tr>
          {userData &&
            userData.map((user) => (
              <tr key={user.lastname}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.age}</td>
                <td>{user.sex}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </UsersStyles>
  );
}

export default Users;
