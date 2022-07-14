import { Box, Button, Container, Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import apiClient from '../services/apiClient';
import Login from './Login';

import { logContext } from './App';
import Card from './Card';

function Tracking({ heading, setUser, user }) {
  const { logs, setLogs } = React.useContext(logContext);

  useEffect(() => {
    const getTracking = async () => {
      try {
        const hCode = heading.toLowerCase();
        const token = localStorage.getItem('token');
        if (token) {
          apiClient.setToken(token);
          const response = await apiClient.getTracking(hCode);
          console.log(response);
          if (response?.data?.[hCode]) {
            console.log(response.data[hCode]);
            setLogs[hCode] = response.data[hCode];
          }
        }
      } catch (e) {
        setUser(null);
      }
    };

    getTracking();
  }, []);

  console.log('logs', logs);

  const renderCards = () => {
    return (
      <Box>
        {_.isObject(logs) && _.isArray(logs[heading.toLowerCase()]) ? (
          <Flex wrap={'wrap'}>
            {logs[heading.toLowerCase()].map((item) => {
              return (
                <Card key={item.id} item={item} type={heading.toLowerCase()} />
              );
            })}
          </Flex>
        ) : null}
      </Box>
    );
  };

  return (
    <>
      {user ? (
        <Container w="100%">
          <Stack>
            <Heading p="2" textAlign={'center'} color="white">
              {heading}
            </Heading>
            <Flex justifyContent={'space-between'}>
              <Heading maxW="300px" textAlign={'center'} color="#fff">
                Overview
              </Heading>
              <NavLink to={`/${heading.toLowerCase()}/create`}>
                <Button maxW="300px">Add {heading}</Button>
              </NavLink>
            </Flex>
            {renderCards()}
          </Stack>
        </Container>
      ) : (
        <Container>
          <Heading size={'lg'} textAlign="center">
            You must be logged in to view this page.
          </Heading>
          <Login />
        </Container>
      )}
    </>
  );
}

export default Tracking;
