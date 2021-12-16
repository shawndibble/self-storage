import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/inertia-react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { currencyFormat } from '@/Helpers/Formatters';

export default function InvoiceDetails({ invoice }) {
  return (
    <>
      <Head title="Invoice" />
      <Grid container spacing={2} direction="row-reverse">
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography>Total:</Typography>
              <Typography variant="h4">{currencyFormat(invoice.amount)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              Line Item
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.shape({
    user: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
};
