import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button, Container, Box } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Box className="nav-bar" w="100%" boxShadow="md">
      <NavLink to="/">
        <span
          style={{ color: 'white', fontSize: '50px' }}
          className="material-symbols-outlined">
          hive
        </span>
      </NavLink>

      <ButtonGroup spacing="6">
        <Button
          _hover={{
            color: 'teal.500',
          }}>
          Activity
        </Button>
        <Button
          _hover={{
            background: 'white',
            color: 'teal.500',
          }}>
          Exercise
        </Button>
        <Button
          _hover={{
            background: 'white',
            color: 'teal.500',
          }}>
          Nutrition
        </Button>
        <Button
          _hover={{
            background: 'white',
            color: 'teal.500',
          }}>
          Sleep
        </Button>
        <NavLink
          to="/login"
          style={({isActive}) => {
            return { color: isActive ? 'var(--orange)' : 'black' };
          }}>
          <Button
            _hover={{
              background: 'white',
              color: 'teal.500',
            }}>
            Log In
          </Button>
        </NavLink>
        <Button
          _hover={{
            background: 'white',
            color: 'teal.500',
          }}
          bg="green"
          color="white">
          Sign Up
        </Button>
      </ButtonGroup>
    </Box>
  );
}
