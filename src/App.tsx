import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/Home";
import LogIn from "./components/LogInPage/LogIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
