import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function MyTextField({ error, ...rest }) {
  return (
    <TextField
      fullWidth
      variant="standard"
      error={!!error.length}
      helperText={error[0]}
      {...rest}
    />
  );
}

MyTextField.defaultProps = {
  error: [],
};

MyTextField.propTypes = {
  error: PropTypes.arrayOf(PropTypes.string),
};
