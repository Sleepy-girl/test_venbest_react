import React, { useState, useEffect } from "react";
import axios from "axios";
import { arrayHeader } from "./dataTable";
import { UsersStyles } from "./UsersStyled";

const initialChecked = { m: false, f: false };
const initialSearch = { name: "", lastname: "", age: "" };

function Users() {
  const [userData, setUserData] = useState([]);
  const [checked, setChecked] = useState(initialChecked);
  const [isShow, setIsShow] = useState(true);
  const [search, setSearch] = useState(initialSearch);

  // const onHandleChange = (e) => {
  //   // const { name, value } = e.target;
  //   setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   console.log(`value`, value);
  //   console.log(`search`, search);

  //   setUserData(
  //     userData.filter((user) =>
  //       user.name.toLowerCase().includes(search[name].toLowerCase())
  //     )
  //   );
  //   console.log(`userData`, userData);
  // };

  const onHandleCheck = (e) => {
    setIsShow(false);
    const { name } = e.target;

    setChecked((prev) => ({ ...prev, [name]: !prev.name }));

    setUserData((prev) => [
      ...prev.map((user) =>
        name === user.sex ? { ...user, checked: !user.checked } : { ...user }
      ),
    ]);
  };

  function getUsers() {
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
  }

  useEffect(() => {
    Object.values(search).every((value) => value === "") && getUsers();
    // Object.values(search).some((value) => value === "") &&
    // setUserData(
    //   userData.filter((user) => user.toLowerCase().includes(search))
    // );
  }, [search]);

  useEffect(() => {
    !userData.length && getUsers();
  }, []);

  // useEffect(() => {
  //   const results = userData.filter((user) =>
  //     user.toLowerCase().includes(search)
  //   );
  //   setUserData(results);
  //   !userData.length && getUsers();
  // }, [search, userData]);

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
                    value={search[arrHeader.name]}
                    placeholder={arrHeader.placeholder}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setSearch((prev) => ({
                        ...prev,
                        [name]: name === "age" ? Number(value) : value,
                      }));
                      // setUserData(
                      //   userData.filter((user) =>
                      //     // user[name] !== "age"
                      //     //   ? user[name]
                      //     //       .toLowerCase()
                      //     //       .includes(search[name].toLowerCase())
                      //     //   : user[name] === value
                      //     console.log(search)
                      //   )
                      // );
                    }}
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
            {/* {console.log(`search`, search)}
            {console.log(`userData`, userData)} */}
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
