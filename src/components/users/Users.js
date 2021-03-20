import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { arrayHeader } from "./dataTable";
import { UsersStyles } from "./UsersStyled";

function Users() {
  const [userData, setUserData] = useState([]);
  const [checked, setChecked] = useState({ m: true, f: true });

  const changeChecked = () => {
    // userData.map((user) => user.sex === checked[user.sex]).split();
    console.log(
      `changeChecked`,
      userData.map((user) => checked[user.sex])
    );
  };

  const onHandleCheck = (e) => {
    const { name } = e.target;

    setChecked((prevChecked) => {
      return { ...prevChecked, [name]: !prevChecked.name };
    });

    setUserData((prevData) => [
      ...prevData.map((user) =>
        name === user.sex ? { ...user, checked: !user.checked } : { ...user }
      ),
    ]);
  };

  const getUsers = () => {
    axios
      .get("https://venbest-test.herokuapp.com/")
      .then((res) =>
        setUserData([
          ...res.data.map((user) => ({
            ...user,
            checked: checked[user.sex],
          })),
        ])
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    !userData.length && getUsers();
  });

  console.log(`userData`, userData);

  return (
    <UsersStyles>
      <table>
        <tbody>
          <tr className="tableHeader">
            {arrayHeader.map((arrHeader) => (
              <th key={arrHeader.title}>
                {arrHeader.title}
                <br />
                {arrHeader.title !== "Пол" ? (
                  <input
                    type={arrHeader.type}
                    name={arrHeader.name}
                    placeholder={arrHeader.placeholder}
                  />
                ) : (
                  arrHeader.checkboxes.map((checkbox) => (
                    <label className="firstOfTypeSex" key={checkbox.name}>
                      {checkbox.lable}
                      <input
                        type={arrHeader.type}
                        name={checkbox.name}
                        checked={changeChecked()}
                        onChange={onHandleCheck}
                      />
                    </label>
                  ))
                )}
              </th>
            ))}
          </tr>
          {userData.length &&
            userData.map(
              (user) =>
                user.checked && (
                  <tr key={user.lastname}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.age}</td>
                    <td>{user.sex}</td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </UsersStyles>
  );
}

export default Users;
