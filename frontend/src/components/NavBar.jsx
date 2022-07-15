import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Box, Text, Flex, Avatar } from '@chakra-ui/react';
import Logo from './Logo';
import { getTracking } from './Tracking';

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}>
      <NavLink to={to}>{children}</NavLink>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

export default function NavBar({ user, setUser, logs, setLogs }) {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['white', 'white', 'primary.700', 'primary.700']}
      // {...props}
    >
      <Flex align="center">
        <Logo
          w="100px"
          color={['white', 'white', 'primary.500', 'primary.500']}
        />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}>
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/activity">Activity </MenuItem>
          <MenuItem to="/exercise">
            <span
              onClick={() => {
                getTracking('exercise', logs, setLogs, setUser);
              }}>
              Exercise
            </span>{' '}
          </MenuItem>
          <MenuItem to="/sleep">
            <span
              onClick={() => {
                getTracking('sleep', logs, setLogs, setUser);
              }}>
              Sleep
            </span>{' '}
          </MenuItem>
          <MenuItem to="/nutrition">
            <span
              onClick={() => {
                getTracking('nutrition', logs, setLogs, setUser);
              }}>
              Nutrition
            </span>{' '}
          </MenuItem>

          {user ? (
            <>
              <Button
                mb={{ base: 8, sm: 0 }}
                mr={{ base: 0, sm: 8 }}
                display="block"
                onClick={() => {
                  setUser(null);
                  navigate('/');
                }}>
                Log out
              </Button>
              <Button
                mb={{ base: 8, sm: 0 }}
                mr={{ base: 0, sm: 8 }}
                rounded="md"
                color={['primary.500', 'primary.500', 'white', 'white']}
                bg={['white', 'white', 'primary.500', 'primary.500']}
                _hover={{
                  bg: [
                    'primary.100',
                    'primary.100',
                    'primary.600',
                    'primary.600',
                  ],
                }}>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
                <Avatar ml="2" maxH={7} maxW={7} />
              </Button>
            </>
          ) : (
            <>
              <MenuItem to="/login">Login</MenuItem>
              <MenuItem to="/signup" isLast>
                <Button
                  size="sm"
                  rounded="md"
                  color={['primary.500', 'primary.500', 'white', 'white']}
                  bg={['white', 'white', 'primary.500', 'primary.500']}
                  _hover={{
                    bg: [
                      'primary.100',
                      'primary.100',
                      'primary.600',
                      'primary.600',
                    ],
                  }}>
                  Sign up
                </Button>
              </MenuItem>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
