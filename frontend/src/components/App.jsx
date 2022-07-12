import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Register from './Register';

import '../styles.css';
import '../root.css';

import NavBar from './NavBar';
import { Box, Center } from '@chakra-ui/react';

export default function App() {
  const [loginInfo, setLoginInfo] = React.useState({ email: '', password: '' });
  const [registerInfo, setRegisterInfo] = React.useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeLogin = (loginInfo) => {
    setLoginInfo(loginInfo);
  };

  const handleChangeRegister = (registerInfo) => {
    setRegisterInfo(registerInfo);
  };

  const handleOnSubmitRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        registerInfo
      );
      console.log(response);
    } catch (e) {
      console.log('Login error', e);
    }
  };

  const handleOnSubmitLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        loginInfo
      );
      console.log(response);
    } catch (e) {
      console.log('Login error', e);
    }
  };

  return (
    <Box w="100%" style={{ height: '100vh' }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                handleChangeLogin={handleChangeLogin}
                loginInfo={loginInfo}
                handleOnSubmitLogin={handleOnSubmitLogin}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleChangeRegister={handleChangeRegister}
                registerInfo={registerInfo}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
