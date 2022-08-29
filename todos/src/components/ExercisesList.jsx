import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const ExercisesList = () => {
  const [getExercise, setExercise] = useState({ exercises: [] });

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:3400/exercises/" + id)
      .then((res) => console.log(res.data));
    setExercise({
      exercises: getExercise.exercises.filter((item) => item._id !== id),
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3400/exercises/")
      .then((respons) => setExercise({ exercises: respons.data }))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getExercise.exercises.map((currentexercise) => {
            return (
              <Exercise
                {...currentexercise}
                deleteExercise={deleteExercise}
                key={currentexercise._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Exercise = ({ _id, username, description, duration, date, deleteExercise }) => (
  <tr>
    <td>{username}</td>
    <td>{description}</td>
    <td>{duration}</td>
    <td>{date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + _id}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          deleteExercise(_id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);
