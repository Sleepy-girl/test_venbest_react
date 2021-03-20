import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UsersStyles } from "./UsersStyled";

const arrayHeader = [
  { title: "Имя", type: "text", name: "name", placeholder: "Введите имя" },
  {
    title: "Фамилия",
    type: "text",
    name: "lastname",
    placeholder: "Введите фамилию",
  },
  {
    title: "Возраст",
    type: "number",
    name: "age",
    placeholder: "Введите возраст",
  },
  {
    title: "Пол",
    type: "checkbox",
    checkboxes: [
      { name: "m", lable: "мужской" },
      { name: "f", lable: "женский" },
    ],
  },
];

function Users() {
  const [userData, setUserData] = useState([]);
  const [checked, setChecked] = useState({ male: true, female: true });

  const onHandleCheck = (e) => {
    // setChecked(
    //   (prev) =>
    //     (e.target.name === "m" && { ...prev, male: !prev.male }) ||
    //     (e.target.name === "f" && { ...prev, female: !prev.female })
    // );

    setUserData((prev) => [
      ...prev.map((user) =>
        e.target.name === user.sex
          ? { ...user, checked: !user.checked }
          : { ...user }
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
            checked: user.sex === "m" ? checked.male : checked.female,
          })),
        ])
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    !userData.length && getUsers();
    onHandleCheck();
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
                    <label className="firstOfTypeSex" key={checkbox.name}>
                      {checkbox.lable}
                      <input
                        type={arrHeader.type}
                        name={checkbox.name}
                        checked={userData.find((user) =>
                          user.sex === "m" ? checked.male : checked.female
                        )}
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
