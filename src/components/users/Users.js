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
            <th className="number">number</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
            <th className="sex">sex</th>
          </tr>
          {!!userData &&
            userData.map((user) => (
              <tr key={userData.age}>
                <td>number</td>
                <td>{userData.name}</td>
                <td>
                  {userData.lastname}
                  {console.log(`userData.lastname`, userData.lastname)}
                </td>
                <td>{userData.age}</td>
                <td>{userData.sex}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </UsersStyles>
  );
}

export default Users;
