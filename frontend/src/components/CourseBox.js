import React from 'react';

import { Flex, Text, Box, Heading, Image, Link, Input, InputRightAddon, InputGroup, Button } from '@chakra-ui/react'
import SectionBoxes from '../containers/SectionBoxes';

function CourseBox() {

  const property = {
    course_id: "696969",
    course_name: "COMP SCI 577",
    course_title: "Intro to Algorithms",
    subject_id: "266",
    sections: [
      {
        section_id: "555"
      },
      {
        section_id: "666"
      }
    ]
  }

  return (
    // <Box bg='#00000000' color='#404040' h='25rem' w='20rem' py='2rem' px='2rem' borderRadius='2rem' m='0.5rem' pl='1.5rem' pt='1rem' borderColor='#A5A5A5' borderWidth='0.15rem'>
    //   <Text fontSize='2xl' fontWeight='bold'>{property.course_name}</Text>
    //   <Text fontSize='xl' fontWeight='bold'>{property.course_name}</Text>
    // </Box>
    <Box p={4} width={{ base: "15em", sm: "20rem", md: "20rem"}} borderRadius='1em' borderWidth='0.1em' borderColor='gray.400'>
      <Box mt={{ base: 4, md: 0 }} ml={{ md: 2 }}>
        <Text
          fontWeight="thick"
          textTransform="uppercase"
          fontSize="xl"
          letterSpacing="wide"
        >
          {property.course_name}
        </Text>
        <Text
          mt={1}
          display="block"
          fontSize="lg"
          lineHeight="normal"
          fontWeight="semibold"
          mb='5'
        >
          {property.course_title}
        </Text>
        <SectionBoxes statuses={[2, 1, 0]}></SectionBoxes>
        <InputGroup fontSize="lg" py="0.4rem" mt="1rem">
          <Input placeholder="Search sections..." w='100%'/>
          <InputRightAddon p="0" children={
            <Button variant="solid" colorScheme="blue" color="white">Add</Button>
          } />
        </InputGroup>
      </Box>
    </Box>
  );
}

export default CourseBox;
