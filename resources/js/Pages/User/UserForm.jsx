import React from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/inertia-react';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

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
              fullWidth
              defaultValue={data.name}
              onChange={handleChange}
              variant="standard"
              error={!!errors.name?.length}
              helperText={errors.name?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              id="email"
              fullWidth
              defaultValue={data.email}
              onChange={handleChange}
              variant="standard"
              error={!!errors.email?.length}
              helperText={errors.email?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              id="phone"
              fullWidth
              defaultValue={data.phone}
              onChange={handleChange}
              variant="standard"
              error={!!errors.phone?.length}
              helperText={errors.phone?.[0]}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              label="Address"
              id="address"
              fullWidth
              defaultValue={data.address}
              onChange={handleChange}
              variant="standard"
              error={!!errors.address?.length}
              helperText={errors.address?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address 2"
              id="address2"
              fullWidth
              defaultValue={data.address2}
              onChange={handleChange}
              variant="standard"
              error={!!errors.address2?.length}
              helperText={errors.address2?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              id="city"
              fullWidth
              defaultValue={data.city}
              onChange={handleChange}
              variant="standard"
              error={!!errors.city?.length}
              helperText={errors.city?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="State"
              id="state"
              fullWidth
              defaultValue={data.state}
              onChange={handleChange}
              variant="standard"
              error={!!errors.state?.length}
              helperText={errors.state?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Zip"
              id="zip"
              fullWidth
              defaultValue={data.zip}
              onChange={handleChange}
              variant="standard"
              error={!!errors.zip?.length}
              helperText={errors.zip?.[0]}
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
