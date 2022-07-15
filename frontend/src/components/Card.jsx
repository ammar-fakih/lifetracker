import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import apiClient from '../services/apiClient';

import { getTracking } from './Tracking';

export default function Card({ item, type, setLogs, logs }) {
  const [imageBroken, setImageBroken] = React.useState(false);
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const handleDeleteCard = async () => {
    try {
      await apiClient.deleteTracking(type, item.id);
      setLogs({
        ...logs,
        [type]: logs[type].filter((log) => log.id !== item.id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderExercise = () => {
    return (
      <Stack width="100%" mt="5" mb="5">
        <Flex justify={'space-around'}>
          <Heading size={'lg'}>{item.name}</Heading>
        </Flex>
        <Flex width="100%">
          <Text flex="1" fontWeight={600}>
            Duration
          </Text>
          <Text flex="1" fontWeight={600}>
            Intensity
          </Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text flex="1">{item.duration}</Text>
          <Text flex="1">{item.intensity}</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text flex="1">{item.created_at.slice(0, 10)}</Text>
          <Text flex="1">{item.category}</Text>
        </Flex>
      </Stack>
    );
  };

  const renderNutrition = () => {
    return (
      <Stack width="100%" mt="5" mb="5">
        <Flex justify={'space-around'}>
          {!imageBroken && (
            <img
              onError={() => {
                setImageBroken(true);
              }}
              src={item.image_url}
              alt={item.name}
              width="auto"
              height="50px"
            />
          )}

          <Heading size={'lg'}>{item.name}</Heading>
        </Flex>
        <Flex width="100%" justifyContent={'space-around'}>
          <Text flex="1" fontWeight={600}>
            Calories
          </Text>
          <Text flex="1" fontWeight={600}>
            Quantity
          </Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text flex="1">{item.calories}</Text>
          <Text flex="1">{item.quantity}</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text flex="1">{item.created_at.slice(0, 10)}</Text>
          <Text flex="1">{item.category}</Text>
        </Flex>
      </Stack>
    );
  };

  const renderSleep = () => {
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    return (
      <Stack width="100%" mt="5" mb="5">
        <Flex justify={'space-around'}>
          <Heading size={'md'}>
            {startDate.getDay()}/{startDate.getDate()}/{startDate.getFullYear()}
          </Heading>
        </Flex>
        <Flex width="100%" justifyContent={'space-around'}>
          <Text fontWeight={600}>Start Time</Text>
          <Text fontWeight={600}>End Time</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>{formatAMPM(startDate)}</Text>
          <Text>{formatAMPM(endDate)}</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>
            {moment.duration(endMoment.diff(startMoment)).asHours()} Hours
          </Text>
        </Flex>
      </Stack>
    );
  };

  return (
    <Flex
      rounded="lg"
      shadow={'lg'}
      bg={'primary.400'}
      color="white"
      dir="column"
      width={'350px'}
      maxW={'350px'}
      padding={'2'}
      margin="2">
      <Button
        color="red"
        position={'absolute'}
        size="xs"
        onClick={handleDeleteCard}>
        X
      </Button>
      {type === 'exercise'
        ? renderExercise()
        : type === 'nutrition'
        ? renderNutrition()
        : renderSleep()}
    </Flex>
  );
}
