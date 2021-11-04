import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/inertia-react';

export default function InvoiceDetails({ invoice }) {
  return (
    <>
      <Head title="Invoice" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            Invoice Page
            {invoice.amount}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.shape({
    user: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
};
