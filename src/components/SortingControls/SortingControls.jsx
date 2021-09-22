import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Slider,
  Typography,
  InputLabel,
  Select,
  Chip,
  Input,
  FormControl,
  MenuItem,
  Grid,
} from '@material-ui/core';

import useStyles from './styles';

const SortingControls = ({ newArray, arraySize, speed }) => {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item md={12} lg={6}>
            <Typography variant="h3" className={classes.title}>
              {/* <img src="" alt="Sorting Logo" height="25px" className={classes.image} /> */}
              Sorting Visualizer
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography align="center" color="secondary" gutterBottom>
              Array Size
            </Typography>
            <Slider
              defaultValue={50}
              color="secondary"
              valueLabelDisplay="auto"
              min={10}
              max={100}
              onChange={(event, newValue) => arraySize[1](event, newValue)}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography align="center" color="secondary" gutterBottom>
              Animation Speed
            </Typography>
            <Slider
              defaultValue={0.5}
              color="secondary"
              valueLabelDisplay="auto"
              step={0.1}
              min={0.1}
              max={1.0}
              onChange={(event, newValue) => speed[1](event, newValue)}
            />
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => newArray()}
            >
              New Array
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default SortingControls;
