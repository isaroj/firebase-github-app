import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react'
import UserContext from '../src/context/UserContext'

// Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from '../src/config/FirebaseConfig'

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Comps
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'


// Common Comps
import Footer from '../src/components/Footer'
import NavBar from "../src/components/NavBar";


import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";

import './App.css'

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App
