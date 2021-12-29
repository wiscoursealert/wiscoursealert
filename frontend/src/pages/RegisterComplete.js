import React, {useRef} from 'react';

import { SimpleGrid } from "@chakra-ui/react"
import { Box, Heading, Flex, Text, FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react'

function RegisterComplete() {
  return (
    <Flex direction='column' bg='white' color='#595959' justifyContent='center' w='100%' h={window.innerHeight} alignItems='center'>
      <Flex>
        <Heading fontSize='6xl' >YOUR REGISTRATION IS COMPLETE!</Heading>
      </Flex>
      <Flex mt="6rem" alignItems='center'>
        <Text fontSize='3xl'  >You can now edit your watching list using<br/> the link we sent to your email. <br/>Please keep the link for the future use.</Text>
      </Flex>
      <Flex mt="2rem">
        <Text fontSize="2xl" color='#D8524E'>www.wiscoursealert.com/pun6969696969</Text>
      </Flex>
    </Flex>
  );
}

export default RegisterComplete;
