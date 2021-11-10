import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import React from 'react';
import PropTypes from 'prop-types';

export default function CreateFab({ label, onClick }) {
  return (
    <Fab
      color="primary"
      aria-label={label}
      sx={{ position: 'absolute', bottom: 24, right: 24 }}
      onClick={() => onClick()}
    >
      <AddIcon />
    </Fab>
  );
}

CreateFab.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
