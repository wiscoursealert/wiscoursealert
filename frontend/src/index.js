import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './pages/Register';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, Flex } from "@chakra-ui/react"
import SectionBoxes from './containers/SectionBoxes';
import CourseBox from './components/CourseBox';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Flex>
        <CourseBox/>
      </Flex>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
