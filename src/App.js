import './App.css';
import Login from './pages/login';
import Home from './pages/home';

import Cointab from './context-api/cointab';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// ! please change the port number accordingly
const BASEURL = `http://localhost:8008`

function App() {

  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [view, setView] = useState('');
  const [edit, setEdit] = useState({ state: false, name: '', email: '', pwd: '', cpwd: '', id: '' });
  const [dlt, setDlt] = useState({ state: false, id: '' });
  const [getAllUser, setGetAllUser] = useState([]);

  return (
    <Cointab.Provider value={{ BASEURL, signUp, setSignUp, signIn, setSignIn, view, setView, dlt, setDlt, getAllUser, setGetAllUser, edit, setEdit }}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to='/login' />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Cointab.Provider>
  );
}

export default App;
