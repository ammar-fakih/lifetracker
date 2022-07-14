import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button, Container, Box, Text } from '@chakra-ui/react';

export default function NavBar({ user, setUser }) {
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
        <NavLink to="/activity">
          <Button
            _hover={{
              color: 'teal.500',
            }}>
            Activity
          </Button>
        </NavLink>

        <NavLink to="/exercise">
          <Button
            _hover={{
              color: 'teal.500',
            }}>
            Exercise
          </Button>
        </NavLink>

        <NavLink to="/nutrition">
          <Button
            _hover={{
              color: 'teal.500',
            }}>
            Nutrition
          </Button>
        </NavLink>

        <NavLink to="/sleep">
          <Button
            _hover={{
              color: 'teal.500',
            }}>
            Sleep
          </Button>
        </NavLink>

        {!user ? (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => {
                return { color: isActive ? 'var(--orange)' : 'black' };
              }}>
              <Button
                _hover={{
                  color: 'teal.500',
                }}>
                Log In
              </Button>
            </NavLink>
            <NavLink
              to="/signup"
              style={({ isActive }) => {
                return { color: isActive ? 'var(--orange)' : 'black' };
              }}>
              <Button
                _hover={{
                  color: 'teal.500',
                }}
                bg="green"
                color="white">
                Sign Up
              </Button>
            </NavLink>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                localStorage.clear();
                setUser(null);
              }}
              _hover={{
                color: 'teal.500',
              }}
              bg="green"
              color="white">
              Logout
            </Button>
            <Text color="white">
              {user.firstName} {user.lastName}
            </Text>
          </>
        )}
      </ButtonGroup>
    </Box>
  );
}
