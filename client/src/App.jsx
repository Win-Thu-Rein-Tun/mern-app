import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Auth, Create, Save } from "./pages";

const App = () => {
  return (
    <div className="text-[20px]">
      <Router>
        <Navbar />
        <div className="flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create" element={<Create />} />
            <Route path="/save" element={<Save />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
