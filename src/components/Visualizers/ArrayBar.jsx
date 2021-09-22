import React from 'react';

import useStyles from './styles';

const ArrayBar = ({ value, bgColor }) => {
  const classes = useStyles();

  return (
    <div
      className={bgColor === 'normal' ? classes.normalBar : classes.compBar}
      style={{
        // backgroundColor: color,
        height: `${value}px`,
      }}
    />
  );
};

export default ArrayBar;
