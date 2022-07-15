import { Button, Center, Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import apiClient from '../services/apiClient';
import Login from './Login';

import { logContext } from './App';
import Card from './Card';

export const getTracking = async (heading, logs, setLogs, setUser) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.setToken(token);
      const response = await apiClient.getTracking(heading);
      if (response?.data?.[heading]) {
        setLogs({ ...logs, [heading]: response.data[heading] });
      }
    }
  } catch (e) {
    setUser(null);
  }
};

function Tracking({ heading, setUser, user }) {
  const { logs, setLogs } = React.useContext(logContext);

  useEffect(() => {
    getTracking(heading.toLowerCase(), logs, setLogs, setUser);
  }, []);

  const renderCards = () => {
    return (
      <Center justify={'center'} align="center" w="100%">
        {_.isObject(logs) && _.isArray(logs[heading.toLowerCase()]) ? (
          <Flex minW="80%" wrap={'wrap'} mr="20" ml="20">
            {logs[heading.toLowerCase()].map((item) => {
              return (
                <Card setLogs={setLogs} logs={logs} key={item.id} item={item} type={heading.toLowerCase()} />
              );
            })}
          </Flex>
        ) : null}
      </Center>
    );
  };

  return (
    <>
      {user ? (
        <Flex direction={'column'} w="100%">
          <Flex justifyContent={'space-around'} alignContent={'center'} mb="20">
            <Heading>{heading}</Heading>
            <NavLink to={`/${heading.toLowerCase()}/create`}>
              <Button maxW="300px">Add {heading}</Button>
            </NavLink>
          </Flex>

          {renderCards()}
        </Flex>
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
