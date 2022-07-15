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
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Register({
  handleChangeRegister,
  registerInfo,
  setUser,
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      const response = await apiClient.signup(registerInfo);
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        navigate('/activity');
      }
      setError('');
    } catch (error) {
      setError(error.response?.data?.error?.message);
      
      console.log(error);
    }
  };

  return (
    <Center w="100%" p="10">
      <Box backgroundColor="white" borderRadius="lg" w="800px">
        <Heading padding="10">Register</Heading>
        <Text color="red">{error}</Text>
        <Stack spacing="2" p="10">
          <Input
            focusBorderColor="#F4A261"
            placeholder="email"
            color="black"
            backgroundColor="white"
            onChange={(e) => {
              handleChangeRegister({
                password: registerInfo.password,
                email: e.target.value,
                userName: registerInfo.userName,
                firstName: registerInfo.firstName,
                lastName: registerInfo.lastName,
                confirmPassword: registerInfo.confirmPassword,
              });
            }}
            value={registerInfo.email}
          />
          <InputGroup marginX={'20'}>
            <Input
              focusBorderColor="#F4A261"
              placeholder="first name"
              color="black"
              backgroundColor="white"
              onChange={(e) => {
                handleChangeRegister({
                  password: registerInfo.password,
                  email: registerInfo.email,
                  userName: registerInfo.userName,
                  firstName: e.target.value,
                  lastName: registerInfo.lastName,
                  confirmPassword: registerInfo.confirmPassword,
                });
              }}
              value={registerInfo.firstName}
            />
            <Input
              focusBorderColor="#F4A261"
              placeholder="last name"
              color="black"
              backgroundColor="white"
              onChange={(e) => {
                handleChangeRegister({
                  password: registerInfo.password,
                  email: registerInfo.email,
                  userName: registerInfo.userName,
                  firstName: registerInfo.firstName,
                  lastName: e.target.value,
                  confirmPassword: registerInfo.confirmPassword,
                });
              }}
              value={registerInfo.lastName}
            />
          </InputGroup>
          <InputGroup size="md">
            <Input
              focusBorderColor="#F4A261"
              pr="4.5rem"
              color="black"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={(e) => {
                handleChangeRegister({
                  password: e.target.value,
                  email: registerInfo.email,
                  userName: registerInfo.userName,
                  firstName: registerInfo.firstName,
                  lastName: registerInfo.lastName,
                  confirmPassword: registerInfo.confirmPassword,
                });
              }}
              value={registerInfo.password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button onClick={handleOnSubmit}>Sign up</Button>
        </Stack>
      </Box>
    </Center>
  );
}
