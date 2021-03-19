import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersStyles } from "./UsersStyled";

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("https://venbest-test.herokuapp.com/")
      .then((res) => setUserData(res.data));
  }, []);

  console.log(userData);

  return (
    <UsersStyles>
      <table>
        <tbody>
          <tr className="tableHeader">
            <th className="name">First name</th>
            <th>Last name</th>
            <th>Age</th>
            <th className="sex">sex</th>
          </tr>
          {!!userData &&
            userData.map((user) => (
              <tr key={user.age}>
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
