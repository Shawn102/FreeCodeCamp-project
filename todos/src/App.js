import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ExercisesList } from "./components/ExercisesList";
import { EditExercise } from "./components/EditExercise";
import { CreateExercise } from "./components/CreateExercise";
import { CreateUser } from "./components/CreateUser";

const url = "http://localhost:3400/home";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<ExercisesList />} />
        <Route path="/edit/:id" element={<EditExercise />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
