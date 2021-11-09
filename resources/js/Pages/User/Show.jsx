import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/inertia-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UserInfo from './UserInfo';
import UserTransactions from './UserTransactions';
import { currencyFormat, daysAgoFormat } from '@/Helpers/Formatters';

export default function UserDetails({
  user, transactions, invoiceTotal, paymentTotal,
}) {
  const balance = paymentTotal - invoiceTotal;
  const mostRecentTransaction = transactions.find((row) => row.type === 'Invoice');
  const pastDue = balance < 0 ? `${daysAgoFormat(mostRecentTransaction.date)} Days` : '--';
  return (
    <>
      <Head title={user.name} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UserInfo user={user} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body1">Payments: </Typography>
                    <Typography variant="h5">{currencyFormat(paymentTotal)}</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body1">Past Due: </Typography>
                    <Typography variant="h5" color={balance < 0 && 'error'}>
                      {pastDue}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body1">Balance: </Typography>
                    <Typography variant="h5" color={balance < 0 ? 'error' : (balance > 0 && 'green')}>
                      {currencyFormat(balance)}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <UserTransactions transactions={transactions} />
        </Grid>
      </Grid>
    </>
  );
}

UserDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    is_admin: PropTypes.bool,
  }).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
  })).isRequired,
  invoiceTotal: PropTypes.number.isRequired,
  paymentTotal: PropTypes.number.isRequired,
};
