import React from 'react';
import { Heading, Flex, Box, Center, Image } from '@chakra-ui/react';
import Spaceship from '../assets/Alien_icon.svg.png';

export default function Home() {
  return (
    <Flex>
      <Center flex={1} flexDir="column">
          <Heading size="3xl" mb="7">Ammar Tracker</Heading>

        <Heading>I'll Track Your Life</Heading>
      </Center>
      <Box flex={1}>
        <Image src={Spaceship} alt="spaceship" maxWidth="70%" />
      </Box>
    </Flex>
  );
}
