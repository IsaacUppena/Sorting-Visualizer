import React, { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import ArrayBar from './ArrayBar';

import useStyles from './styles';

const Visualizer = ({ array, sort, animate, speed }) => {
  const classes = useStyles();

  let populateBars = () => {
    return array.map((value, idx) => (
      <ArrayBar key={idx} value={value} bgColor="normal" />
    ));
  };

  const [arrayBars, setArrayBars] = useState(populateBars());
  const [sorting, setSorting] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!sorting) {
      setArrayBars(populateBars());
    }
  }, [array]);

  let getSlideShow = (animations) => {
    let slideShow = [];

    // Initial copy of arrayBars, this will be updated to show steps of sorting
    let arrayBarsCopy = [...populateBars()];

    // loop to schedule animations
    for (let a of animations) {
      if (a.type === 'swap') {
        let [barOneIdx, barTwoIdx] = a.cols;

        let barOneHeight = arrayBarsCopy[barOneIdx].props.value;
        let barTwoHeight = arrayBarsCopy[barTwoIdx].props.value;

        arrayBarsCopy[barOneIdx] = (
          <ArrayBar key={barOneIdx} value={barTwoHeight} bgColor="normal" />
        );
        arrayBarsCopy[barTwoIdx] = (
          <ArrayBar key={barTwoIdx} value={barOneHeight} bgColor="normal" />
        );
        // Push a frame of animation into the slideshow
        slideShow.push([...arrayBarsCopy]);
      } else if (a.type === 'overwrite') {
        let [barIdx, newHeight] = a.cols;
        arrayBarsCopy[barIdx] = (
          <ArrayBar key={barIdx} value={newHeight} bgColor="normal" />
        );
        slideShow.push([...arrayBarsCopy]);
      } else {
        // type must be "comparison"
        let [barOneIdx, barTwoIdx] = a.cols;
        let barOneHeight = arrayBarsCopy[barOneIdx].props.value;
        let barTwoHeight = arrayBarsCopy[barTwoIdx].props.value;

        arrayBarsCopy[barOneIdx] = (
          <ArrayBar key={barOneIdx} value={barOneHeight} bgColor="comp" />
        );
        arrayBarsCopy[barTwoIdx] = (
          <ArrayBar key={barTwoIdx} value={barTwoHeight} bgColor="comp" />
        );

        // Push a frame of animation into the slideshow
        slideShow.push([...arrayBarsCopy]);

        arrayBarsCopy[barOneIdx] = (
          <ArrayBar key={barOneIdx} value={barOneHeight} bgColor="normal" />
        );
        arrayBarsCopy[barTwoIdx] = (
          <ArrayBar key={barTwoIdx} value={barTwoHeight} bgColor="normal" />
        );

        // Push a frame of animation into the slideshow
        slideShow.push([...arrayBarsCopy]);
      }
    }

    return slideShow;
  };

  let runAnimations = (array, animate, delay) => {
    let slideShow;

    if (!sorting) {
      setArrayBars([...populateBars()]);
      slideShow = getSlideShow(animate([...array]));
      setSorting(true);
      for (let i = 0; i < slideShow.length; i++) {
        setTimeout(() => {
          setArrayBars([...slideShow[i]]);
        }, i * delay);

        // After all animations have run, sorting is false
        if (i === slideShow.length - 1) {
          setTimeout(() => {
            setSorting(false);
          }, i * delay);
        }
      }
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className={classes.arrayBars}>{arrayBars}</div>
          <Typography variant="h5" color="primary">
            {sort.title}
          </Typography>
          <Typography variant="body2" color="primary">
            {sort.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => runAnimations(array, animate, speed)}
          >
            Sort Me
          </Button>
          <div className={classes.grow} />
          <IconButton
            onClick={handleClickOpen}
            color="primary"
            aria-label="Show Details"
          >
            <InfoIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {sort.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Very interesting, next!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Visualizer;
