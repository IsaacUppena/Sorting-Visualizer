import { createTheme, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import SortingControls from './components/SortingControls/SortingControls';
import Visualizers from './components/Visualizers/Visualizers';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import cyan from '@material-ui/core/colors/cyan';
import blueGrey from '@material-ui/core/colors/blueGrey';

import { sorts } from './constants/sorts';

const App = () => {
  const [speed, setSpeed] = useState(0.5);
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState(resetArray());

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      primary: {
        main: '#5d5c61',
      },
      secondary: {
        main: '#fff',
      },
      bars: {
        main: '#ff9a8d',
      },
    },
  });

  function resetArray() {
    const newAry = [];
    for (let i = 0; i < arraySize; i++) {
      newAry.push(randomIntFromInterval(5, 400));
    }
    return newAry;
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleNewArray = () => {
    setArray(resetArray());
  };

  const handleArraySizeChange = (event, newSize) => {
    setArraySize(newSize);
  };

  const handleSpeedChange = (event, newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <ThemeProvider theme={theme}>
      <SortingControls
        newArray={handleNewArray}
        arraySize={[arraySize, handleArraySizeChange]}
        speed={[speed, handleSpeedChange]}
      />
      <Visualizers array={array} selectedSorts={sorts} speed={2 / speed} />
    </ThemeProvider>
  );
};

export default App;
