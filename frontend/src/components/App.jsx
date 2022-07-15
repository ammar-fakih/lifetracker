import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import apiClient from '../services/apiClient';

import '../root.css';

import NavBar from './NavBar';
import { Box } from '@chakra-ui/react';
import Tracking from './Tracking';
import TrackingForm from './TrackingForm';

import { inputs } from '../constants';
import Activity from './Activity';
import NotFound from './NotFound';

export const authContext = React.createContext();
export const logContext = React.createContext();

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
  const [logs, setLogs] = React.useState({});

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

  return (
    <Box w="100%" style={{ height: '100vh' }}>
      <BrowserRouter>
        <logContext.Provider value={{ logs, setLogs }}>
          <authContext.Provider
            value={{
              loginError,
              handleChangeLogin,
              loginInfo,
              setLoginError,
              setUser,
              user,
            }}>
            <NavBar
              user={user}
              setUser={setUser}
              logs={logs}
              setLogs={setLogs}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/signup"
                element={
                  <Register
                    setUser={setUser}
                    handleChangeRegister={handleChangeRegister}
                    registerInfo={registerInfo}
                  />
                }
              />
              <Route path="/activity" element={<Activity user={user} />} />
              <Route
                path="/exercise"
                element={
                  <Tracking
                    user={user}
                    setUser={setUser}
                    heading={'Exercise'}
                  />
                }
              />
              <Route
                path="/sleep"
                element={
                  <Tracking user={user} setUser={setUser} heading={'Sleep'} />
                }
              />
              <Route
                path="/nutrition"
                element={
                  <Tracking
                    user={user}
                    setUser={setUser}
                    heading={'Nutrition'}
                  />
                }
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
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </authContext.Provider>
        </logContext.Provider>
      </BrowserRouter>
    </Box>
  );
}
