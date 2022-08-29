import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-warning">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          ExerciseTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto p-3">
            <Link
              to="/"
              className="nav-link active"
              aria-current="page"
              href="#"
            >
              Exercise
            </Link>
            <Link to="/create" className="nav-link" href="#">
              Create Exercise Log
            </Link>
            <Link to="/user" className="nav-link" href="#">
              Create User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
