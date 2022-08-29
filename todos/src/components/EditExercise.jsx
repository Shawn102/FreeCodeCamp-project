import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditExercise = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [inputForm, setInputForm] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
  const onChangehandle = (e) => {
    const { name, value } = e.target;
    setInputForm((previousState) => {
      return { ...previousState, [name]: value };
    });
  };
  const onChangeDate = (date) => {
    setInputForm((previous) => {
      return { ...previous, date: date };
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3400/exercises/" + id)
      .then((res) => {
        setInputForm({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("http://localhost:3400/users/").then((response) => {
      if (response.data.length > 0) {
        setInputForm((prev) => {
          return {
            ...prev,
            users: response.data.map((user) => user.username),
          };
        });
      }
    });
  }, [id]);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { username, description, duration, date } = inputForm;
    const exercise = { username, description, duration, date };
    console.log(exercise);

    axios
      .post("http://localhost:3400/exercises/update/" + id, exercise)
      .then((response) => console.log(response.data));
    navigate("/");
  };
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            name="username"
            value={inputForm.username}
            onChange={onChangehandle}
          >
            {inputForm.users &&
              inputForm.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            name="description"
            className="form-control"
            value={inputForm.description}
            onChange={onChangehandle}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={inputForm.duration}
            onChange={onChangehandle}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              name="date"
              selected={inputForm.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group mt-3">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
