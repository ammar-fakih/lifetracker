import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import apiClient from '../services/apiClient';

import '../styles.css';
import '../root.css';

import NavBar from './NavBar';
import { Box } from '@chakra-ui/react';
import Tracking from './Tracking';
import TrackingForm from './TrackingForm';

import { inputs } from '../constants';

export default function App() {
  const [loginInfo, setLoginInfo] = React.useState({ email: '', password: '' });
  const [loginError, setLoginError] = React.useState('');
  const [registerInfo, setRegisterInfo] = React.useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        apiClient.setToken(token);
        const response = await apiClient.getUser();
        setUser(response.data.user);
        console.log(response.data.user);
      }
    };

    getUser();
  }, []);

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
    const response = await apiClient.login(loginInfo);
    if (response.data?.user) {
      console.log(response.data);
      setUser(response.data.user);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <Box w="100%" style={{ height: '100vh' }}>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                loginError={loginError}
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
          <Route path="/exercise" element={<Tracking heading={'Exercise'} />} />
          <Route path="/sleep" element={<Tracking heading={'Sleep'} />} />
          <Route
            path="/nutrition"
            element={<Tracking heading={'Nutrition'} />}
          />
          <Route
            path="/exercise/create"
            element={
              <TrackingForm heading="Exercise" inputs={inputs.exercise} />
            }
          />
          <Route
            path="/sleep/create"
            element={<TrackingForm heading="Sleep" inputs={inputs.sleep} />}
          />
          <Route
            path="/nutrition/create"
            element={
              <TrackingForm heading="Nutrition" inputs={inputs.nutrition} />
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
