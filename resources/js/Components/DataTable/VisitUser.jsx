import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import React from 'react';
import PropTypes from 'prop-types';

export default function VisitUser({ value, visitUser }) {
  return (
    <>
      {value.name}
      <Tooltip title={`Open ${value.name}`}>
        <IconButton
          aria-label={`Open ${value.name}`}
          onClick={() => visitUser(value.id)}
          size="small"
        >
          <LaunchIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
}

VisitUser.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  visitUser: PropTypes.func.isRequired,
};
