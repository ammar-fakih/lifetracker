import React, { useState } from 'react';
import {
  Input,
  Heading,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
  Box,
  Center,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { authContext } from './App';
import apiClient from '../services/apiClient';
import { useEffect } from 'react';

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    user,
    setUser,
    setLoginError,
    handleChangeLogin,
    loginInfo,
    loginError,
  } = React.useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/activity');
    }
  });

  const handleOnSubmitLogin = async () => {
    const response = await apiClient.login(loginInfo);
    if (response.data?.user) {
      console.log(response.data);
      setUser(response.data.user);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      navigate('/activity');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <Center w="100%" p="10">
      <Box backgroundColor="white" borderRadius="lg" w="800px">
        <Heading padding="10">Log In</Heading>

        <Stack spacing="2" p="10">
          <Text color="red">{loginError}</Text>
          <Input
            focusBorderColor="#F4A261"
            placeholder="email"
            color="black"
            backgroundColor="white"
            onChange={(e) => {
              handleChangeLogin({
                password: loginInfo.password,
                email: e.target.value,
              });
            }}
            value={loginInfo.email}
          />
          <InputGroup size="md">
            <Input
              focusBorderColor="#F4A261"
              pr="4.5rem"
              color="black"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={(e) => {
                handleChangeLogin({
                  password: e.target.value,
                  email: loginInfo.email,
                });
              }}
              value={loginInfo.password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button onClick={handleOnSubmitLogin}>Log In</Button>
        </Stack>
      </Box>
    </Center>
  );
}
