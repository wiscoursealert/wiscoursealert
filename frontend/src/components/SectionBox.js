import React from 'react';

import { Flex, Text } from '@chakra-ui/react'

function SectionBox(props) {
  let textSize = { base: "m", sm: "l"}
  let status = props.status
  let bg = 'gray'
  if(status === 2){
    bg = '#59B75D'
  }
  else if(status === 1){
    bg = '#EFAC50'
  }
  else if(status === 0){
    bg = '#D8524E'
  }
  return (
    <Flex bg={bg} color='white' h='fit-content' w='100%' alignItems='center' justifyContent='space-between' py='0.6rem' px='1.2rem' fontSize={textSize} borderRadius='0.5rem' my='0.1rem'>
      <Text>LEC 001 / DIS 001</Text>
      <Text>×</Text>
    </Flex>
  );
}

export default SectionBox;
