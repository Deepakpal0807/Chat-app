import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

import Navbar from "./Component/Navbar";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import  {useAuthStore} from "./Store/useAuth.js";


import "./App.css";

function App() {
  const { authuser, checkAuth, ischeckingauth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log("Print the user details:", authuser,ischeckingauth);

  if (ischeckingauth && authuser === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authuser?<Homepage />: <Navigate to="/login"/>} />
        <Route path="/signup" element={!authuser?<Signup />: <Navigate to="/"/>} />
        <Route path="/login" element={!authuser?<Login />: <Navigate to="/"/>} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={authuser?<Profile />: <Navigate to="/login"/>} />
      </Routes>
    </>
  );
}

export default App;
