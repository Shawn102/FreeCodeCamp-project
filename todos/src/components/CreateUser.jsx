import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  //   const navigate = useNavigate();
  const [inputUser, setInputUser] = useState({
    username: "",
  });

  const userOnChangeHandle = (e) => {
    const { name, value } = e.target;
    setInputUser((previous) => {
      return { ...previous, [name]: value };
    });
  };
  const HandleOnSubmit = (e) => {
    e.preventDefault();
    const user = { username: inputUser.username };
    console.log(user);
    axios
      .post("http://localhost:3400/users/add", user)
      .then((response) => console.log(response.data));
    // navigate("/");
    setInputUser({ username: "" });
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={HandleOnSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            name="username"
            value={inputUser.username}
            onChange={userOnChangeHandle}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
};
