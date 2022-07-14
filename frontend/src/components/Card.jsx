import { Box, createLocalStorageManager, Flex } from '@chakra-ui/react';
import React from 'react';

export default function Card({ item, type }) {
console.log(item)
  return (
    <Flex dir="column" width={'300px'} height={'350px'}>
      <Box>{item.start_time}</Box>
    </Flex>
  );
}
