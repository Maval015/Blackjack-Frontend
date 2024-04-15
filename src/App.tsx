import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/Home";
import LogIn from "./components/LogInPage/LogIn";
import CreateAccount from "./components/CreateAccountPage/CreateAccount";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
