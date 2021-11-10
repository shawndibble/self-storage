import React from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/inertia-react';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@/Components/Form/TextField';

export default function UserForm({ onClose, storageUnits, user }) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data, setData, post, patch, processing, errors,
  } = useForm({
    name: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    storageUnit: '',
    ...user,
  });

  function handleChange(e) {
    const key = e.target.id ?? e.target.name;
    setData(key, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const options = {
      onSuccess: ({ props: { flash } }) => {
        enqueueSnackbar(flash?.message, { variant: 'success' });
        onClose();
      },
    };
    return user.id ? patch(`/users/${user.id}`, options) : post('/users', options);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              id="name"
              required
              defaultValue={data.name}
              onChange={handleChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              id="email"
              defaultValue={data.email}
              onChange={handleChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              id="phone"
              defaultValue={data.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              label="Address"
              id="address"
              defaultValue={data.address}
              onChange={handleChange}
              error={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address 2"
              id="address2"
              defaultValue={data.address2}
              onChange={handleChange}
              error={errors.address2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              id="city"
              defaultValue={data.city}
              onChange={handleChange}
              error={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="State"
              id="state"
              defaultValue={data.state}
              onChange={handleChange}
              error={errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Zip"
              id="zip"
              defaultValue={data.zip}
              onChange={handleChange}
              error={errors.zip}
            />
          </Grid>
          {!!storageUnits && !!Object.keys(storageUnits[0]).length && (
            <Grid item xs={12}>
              <TextField
                name="storageUnit"
                select
                label="Storage Unit"
                value={data.storageUnit}
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
        <Button variant="text" autoFocus onClick={() => onClose()}>
          Cancel
        </Button>
        <LoadingButton variant="contained" type="submit" loading={processing}>Submit</LoadingButton>
      </DialogActions>
    </form>
  );
}

UserForm.defaultProps = {
  storageUnits: [{}],
  user: {},
};

UserForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  storageUnits: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    phone: PropTypes.string,
  }),
};
