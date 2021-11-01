import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';

export default function UserDetails({ user }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <UserInfo user={user} />
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography>Payments</Typography>
            <Grid container>
              <Grid item />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
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
};
