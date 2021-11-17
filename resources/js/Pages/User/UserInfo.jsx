import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { currencyFormat } from '@/Helpers/Formatters';
import DialogForm from '@/Components/DialogForm';
import UserForm from '@/Pages/User/UserForm';

export default function UserInfo({ user, storageUnits }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const editUser = () => setOpenEdit(true);

  return (
    <>
      <Card sx={{ marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">
            {user.name}
            <IconButton aria-label={`Edit ${user.name}`} onClick={editUser} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
          <div style={{ textAlign: 'center' }}>
            {!!user.is_admin && <Chip label="Administrator" color="primary" size="small" />}
          </div>
        </CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" valign="top">
                Email:
              </TableCell>
              <TableCell sx={{
                maxWidth: 0, textOverflow: 'ellipsis', overflow: 'hidden', width: '90%',
              }}
              >
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" valign="top">
                Phone:
              </TableCell>
              <TableCell>
                {user.phone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" valign="top">
                Address:
              </TableCell>
              <TableCell>
                {user.address}
                {!!user.address2 && <br />}
                {user.address2}
                <br />
                {user.city}
                {', '}
                {user.state}
                {' '}
                {user.zip}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" textAlign="center">Storage Units</Typography>
          <br />
          {user.storage_units.map((unit, i, { length }) => (
            <div key={unit.name}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>
                    Unit:
                    {' '}
                    {unit.name}
                    {' '}
                    |
                    {' '}
                    {unit.size.name}
                    {' '}
                    |
                    {' '}
                    {currencyFormat(unit.size.rate)}
                  </Typography>
                </Grid>
                <Grid item sx={{ marginTop: '-3px' }}>
                  {unit.is_locked
                    ? <Lock color="error" fontSize="small" />
                    : <LockOpen color="disabled" fontSize="small" />}
                </Grid>
              </Grid>
              {!!unit.notes && (
                <Typography>
                  Notes:
                  {' '}
                  {unit.notes}
                </Typography>
              )}
              {length - 1 !== i && <hr style={{ margin: '16px 0' }} />}
            </div>
          ))}
        </CardContent>
      </Card>
      <DialogForm open={openEdit} title="Edit User">
        <UserForm onClose={() => setOpenEdit(false)} storageUnits={storageUnits} user={user} />
      </DialogForm>
    </>
  );
}

UserInfo.defaultProps = {
  storageUnits: null,
};

UserInfo.propTypes = {
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
    storage_units: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      notes: PropTypes.string,
    })),
  }).isRequired,
  storageUnits: PropTypes.arrayOf(PropTypes.object),
};
