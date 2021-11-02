import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';

export default function PaymentDetails({ payment }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          Payment Page
        </Card>
      </Grid>
    </Grid>
  );
}

PaymentDetails.propTypes = {
  payment: PropTypes.shape({
    user: PropTypes.string,
  }).isRequired,
};
