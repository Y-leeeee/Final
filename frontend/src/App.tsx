import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar/Sidebar";
import "./App.css";
import Home from "./pages/home";
import Recipes from "./pages/recipes";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<Recipes />} />
      </Routes>
    </Router>
  );
}

export default App;
