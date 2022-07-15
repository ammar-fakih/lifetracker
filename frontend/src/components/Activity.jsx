import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function Activity() {
  const Item = ({ header, data }) => {
    return (
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
    );
  };

  return (
    <Flex direction="column" align={'center'}>
      <Heading>Activity Feed</Heading>

      <Flex margin="20" wrap="wrap" maxW="1600px">
        <Item header="Total Exercise Minutes" data="20" />
        <Item header="Average Sleep Hours" />
        <Item header="Average Daily Calories" />
        <Item header="Maximum Hourly Calories"/>
        <Item header="Average Exercise Intensity"/>
        <Item header="Total Hours Slept"/>
      </Flex>
    </Flex>
  );
}
