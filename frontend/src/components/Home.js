import React from 'react';
import { Heading, Container } from '@chakra-ui/react';
import Spaceship from '../assets/spaceship.jpeg';

export default function Home() {
  return (
    <Container className="home">
      <img src={Spaceship} alt="spaceship" />
      <Heading>Ammar Tracker</Heading>
    </Container>
  );
}
