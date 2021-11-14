import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import * as React from 'react';

export default function Copyright({ site, ...props }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={site.url}>
        {site.name}
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

Copyright.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
