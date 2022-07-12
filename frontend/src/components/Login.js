import React, { useState } from 'react';
import {
  Input,
  Heading,
  Container,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
  Box,
  Center,
} from '@chakra-ui/react';

export default function Login({
  handleChangeLogin,
  loginInfo,
  handleOnSubmitLogin,
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Center w="100%" p="10">
      <Box backgroundColor="white" borderRadius="lg" w="800px">
        <Heading padding="10">Log In</Heading>
        <Stack spacing="2" p="10">
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
