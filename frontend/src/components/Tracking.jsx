import { Box, Button, Container, Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Tracking({ heading, cards = [] }) {
  return (
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
        <Flex flexWrap={'wrap'}>
          {cards.map((card, index) => {
            return <Box></Box>;
          })}
        </Flex>
      </Stack>
    </Container>
  );
}
