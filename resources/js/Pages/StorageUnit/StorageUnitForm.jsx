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

export default function StorageUnitForm({ onClose, storageUnit, sizes }) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data, setData, post, patch, processing, errors,
  } = useForm({
    name: '',
    size_id: '',
    user_id: null,
    notes: '',
    ...storageUnit,
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
    return storageUnit.id ? patch(`/storage-units/${storageUnit.id}`, options) : post('/storage-units', options);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              id="name"
              required
              fullWidth
              autoFocus
              defaultValue={data.name}
              onChange={handleChange}
              variant="standard"
              error={!!errors.name?.length}
              helperText={errors.name?.[0]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="size_id"
              id="size_id"
              select
              label="Size"
              value={data.size_id}
              onChange={handleChange}
              variant="standard"
              fullWidth
              error={!!errors.size_id}
              helperText={errors.size_id?.[0]}
              required
            >
              <MenuItem sx={{ color: 'gray' }} value=""><em>Select unit size</em></MenuItem>
              {sizes.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              id="notes"
              fullWidth
              multiline
              maxRows={4}
              defaultValue={data.notes}
              onChange={handleChange}
              variant="standard"
              error={!!errors.notes?.length}
              helperText={errors.notes?.[0]}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton type="submit" loading={processing}>Submit</LoadingButton>
      </DialogActions>
    </form>
  );
}

StorageUnitForm.defaultProps = {
  storageUnit: {},
};

StorageUnitForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  storageUnit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    notes: PropTypes.string,
  }),
};
