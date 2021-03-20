import React, { useState, useEffect } from "react";
import axios from "axios";
import { arrayHeader } from "./dataTable";
import { UsersStyles } from "./UsersStyled";

function Users() {
  const [userData, setUserData] = useState([]);
  const [checked, setChecked] = useState({ m: false, f: false });
  const [isShow, setIsShow] = useState(true);

  const onHandleCheck = (e) => {
    setIsShow(false);
    const { name } = e.target;
    // console.log(`e.target.checked`, e.target.checked);

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
  }, []);

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
                    <label key={checkbox.name}>
                      {checkbox.lable}
                      <input
                        type={arrHeader.type}
                        name={checkbox.name}
                        onChange={onHandleCheck}
                      />
                    </label>
                  ))
                )}
              </th>
            ))}
          </tr>
          {userData.map(
            (user) =>
              (isShow || user.checked) && (
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
