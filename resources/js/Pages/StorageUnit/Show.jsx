import * as React from 'react';
import { Head } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Info from '@/Pages/StorageUnit/Info';

export default function StorageUnitDetails({ storageUnit, sizes, users }) {
  return (
    <>
      <Head title={`Unit ${storageUnit.name}`} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Info storageUnit={storageUnit} sizes={sizes} users={users} />
        </Grid>

        <Grid item xs={12} md={8} />
      </Grid>
    </>
  );
}

StorageUnitDetails.defaultProps = {
  sizes: [{}],
  users: [{}],
};

StorageUnitDetails.propTypes = {
  storageUnit: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
};
