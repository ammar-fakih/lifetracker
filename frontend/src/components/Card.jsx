import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';

export default function Card({ item, type }) {
  const renderExercise = () => {
    return (
      <Stack width="100%">
        <Flex justify={'space-around'}>
          <Heading size={'md'}>{item.name}</Heading>
        </Flex>
        <Flex width="100%" justifyContent={'space-around'}>
          <Text fontWeight={600}>Duration</Text>
          <Text fontWeight={600}>Intensity</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>{item.duration}</Text>
          <Text>{item.intensity}</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>{item.created_at.slice(0, 10)}</Text>
          <Text>{item.category}</Text>
        </Flex>
      </Stack>
    );
  };

  const renderNutrition = () => {
    return (
      <Stack width="100%">
        <Flex justify={'space-around'}>
          <Image src={item.image} alt={item.name} />
          <Heading size={'md'}>{item.name}</Heading>
        </Flex>
        <Flex width="100%" justifyContent={'space-around'}>
          <Text fontWeight={600}>Calories</Text>
          <Text fontWeight={600}>Quantity</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>{item.calories}</Text>
          <Text>{item.quantity}</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>{item.created_at.slice(0, 10)}</Text>
          <Text>{item.category}</Text>
        </Flex>
      </Stack>
    );
  };

  const renderSleep = () => {
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const createdAt = new Date(item.created_at);
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    const sub = endDate - startDate;
    return (
      <Stack width="100%">
        <Flex justify={'space-around'}>
          <Heading size={'md'}>
            {createdAt.getDay()}/{createdAt.getDate()}/{createdAt.getFullYear()}
          </Heading>
        </Flex>
        <Flex width="100%" justifyContent={'space-around'}>
          <Text fontWeight={600}>Start Time</Text>
          <Text fontWeight={600}>End Time</Text>
        </Flex>
        <Flex justifyContent={'space-around'}>
          <Text>
            {startDate.getHours()}:{startDate.getMinutes()}
          </Text>
          <Text>
            {endDate.getHours()}:{endDate.getMinutes()}
          </Text>
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
      padding={'5'}
      margin="2">
      {type === 'exercise'
        ? renderExercise()
        : type === 'nutrition'
        ? renderNutrition()
        : renderSleep()}
    </Flex>
  );
}
