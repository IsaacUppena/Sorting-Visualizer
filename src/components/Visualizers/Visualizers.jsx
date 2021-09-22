import React from 'react';
import { Grid } from '@material-ui/core';

import Visualizer from './Visualizer';
import bubbleAnimations from '../../sorts/bubblesort';
import mergeAnimations from '../../sorts/mergesort';
import quickAnimations from '../../sorts/quicksort';
import heapAnimations from '../../sorts/heapsort';

import useStyles from './styles';

const Visualizers = ({ array, selectedSorts, speed }) => {
  const classes = useStyles();

  // Links a sort to its animations
  let mapAnimations = {
    0: mergeAnimations,
    1: quickAnimations,
    2: bubbleAnimations,
    3: heapAnimations,
  };

  return (
    <main position="relative" className={classes.content}>
      <Grid container justify="center" spacing={4}>
        {selectedSorts.map((sort) => (
          <Grid item key={sort.id} xs={12} sm={6} md={4} lg={3}>
            <div id={`visualizer${sort.id}`}>
              <Visualizer
                array={array}
                sort={sort}
                animate={mapAnimations[sort.id]}
                speed={speed}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Visualizers;
