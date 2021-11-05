import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';

export default function CreateUser({ onClose, storageUnits }) {
  const { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState({
    name: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    storageUnit: '',
  });

  function handleChange(e) {
    const key = e.target.id ?? e.target.name;
    const { value } = e.target;
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Inertia.post('/users', values, {
      onSuccess: ({ props: { flash } }) => {
        enqueueSnackbar(flash?.message, { variant: 'success' });
        onClose();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Name" id="name" required fullWidth defaultValue={values.name} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Email" id="email" fullWidth defaultValue={values.email} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Phone" id="phone" fullWidth defaultValue={values.phone} onChange={handleChange} variant="standard" />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField label="Address" id="address" fullWidth defaultValue={values.address} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Address 2" id="address2" fullWidth defaultValue={values.address2} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City" id="city" fullWidth defaultValue={values.city} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="State" id="state" fullWidth defaultValue={values.state} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Zip" id="zip" fullWidth defaultValue={values.zip} onChange={handleChange} variant="standard" />
          </Grid>
          {!!Object.keys(storageUnits[0]).length && (
            <Grid item xs={12}>
              <TextField
                name="storageUnit"
                select
                label="Storage Unit"
                value={values.storageUnit}
                onChange={handleChange}
                helperText="Assign Storage Unit"
                variant="standard"
                fullWidth
              >
                {storageUnits.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose()}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
}

CreateUser.defaultProps = {
  storageUnits: null,
};

CreateUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  storageUnits: PropTypes.arrayOf(PropTypes.object),
};
