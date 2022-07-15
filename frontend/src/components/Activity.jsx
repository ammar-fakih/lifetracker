import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import apiClient from '../services/apiClient';
import Login from './Login';

export default function Activity({ user, logs }) {
  const [activities, setActivities] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getActivity();
        setActivities(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [logs]);

  const Item = ({ header, data }) => {
    return (
      <>
        {data && (
          <Flex
            color="white"
            p="3"
            w="360px"
            h="200px"
            bg="primary.400"
            rounded="lg"
            shadow={'lg'}
            margin="5"
            direction={'column'}
            align="center">
            <Heading flex="1" size="lg" textAlign={'center'}>
              {header}
            </Heading>
            <Heading flex="1">{data}</Heading>
          </Flex>
        )}
      </>
    );
  };

  return (
    <>
      {user ? (
        <Flex direction="column" align={'center'}>
          <Heading>Activity Feed</Heading>

          {!Object.keys(activities).find((item) => !!activities[item]) && (
            <Heading mt="10" size="md">
              Nothing to see here
            </Heading>
          )}

          <Flex margin="20" wrap="wrap" maxW="1600px">
            <Item
              header="Total Exercise Minutes"
              data={
                activities?.total_duration ? activities.total_duration : null
              }
            />
            <Item
              header="Average Sleep Hours"
              data={
                activities?.avg_sleep_time ? activities.avg_sleep_time : null
              }
            />
            <Item
              header="Average Exercise Intensity"
              data={
                activities?.avg_intensity
                  ? Math.floor(activities.avg_intensity)
                  : null
              }
            />
            <Item
              header="Total Hours Slept"
              data={
                activities?.total_sleep_time
                  ? activities.total_sleep_time
                  : null
              }
            />
          </Flex>
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
