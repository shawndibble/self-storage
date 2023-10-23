import React from 'react';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import { currencyFormat } from '@/Helpers/Formatters';

export default function Dashboard({ monthlySales }) {
  return (
    <>
      <Head title="Dashboard" />

      <Grid container>
        <Grid item>
          <Card>
            <CardContent>
              <ul>
                {monthlySales.map(({ month, year, total }) => (
                  <li key={`${year}-${month}`}>
                    {month}
                    /
                    {year}
                    {' => '}
                    {currencyFormat(total)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

Dashboard.propTypes = {
  monthlySales: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
    total: PropTypes.string,
  })).isRequired,
};
