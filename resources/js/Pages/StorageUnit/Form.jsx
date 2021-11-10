import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useForm } from '@inertiajs/inertia-react';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@/Components/Form/TextField';

export default function Form({ onClose, storageUnit, sizes }) {
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
              autoFocus
              defaultValue={data.name}
              onChange={handleChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {!!Object.keys(sizes[0]).length && (
              <TextField
                name="size_id"
                id="size_id"
                select
                label="Size"
                value={data.size_id}
                onChange={handleChange}
                error={errors.size_id}
              >
                <MenuItem sx={{ color: 'gray' }} value=""><em>Select unit size</em></MenuItem>
                {sizes.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              id="notes"
              multiline
              maxRows={4}
              defaultValue={data.notes}
              onChange={handleChange}
              error={errors.notes}
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

Form.defaultProps = {
  storageUnit: {},
};

Form.propTypes = {
  onClose: PropTypes.func.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  storageUnit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    notes: PropTypes.string,
  }),
};
