import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { Link as InertiaLink } from '@inertiajs/inertia-react';
import { currencyFormat } from '@/Helpers/Formatters';
import Form from '@/Pages/StorageUnit/Form';
import DialogForm from '@/Components/DialogForm';

export default function StorageUnitInfo({ storageUnit, sizes, users }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const editStorageUnit = () => {
    setOpenEdit(true);
  };

  return (
    <>
      <Card sx={{ marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">
            Unit
            {' '}
            {storageUnit.name}
            <IconButton aria-label={`Edit unit ${storageUnit.name}`} onClick={editStorageUnit} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
        </CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" valign="top">
                Size:
              </TableCell>
              <TableCell>
                {storageUnit.size.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" valign="top">
                Rate:
              </TableCell>
              <TableCell>
                {currencyFormat(storageUnit.size.rate)}
                /month
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" valign="top">
                Customer:
              </TableCell>
              <TableCell>
                {!storageUnit.user ? <em>Unassigned</em> : (
                  <Link component={InertiaLink} href={`/users/${storageUnit.user.id}`}>
                    {storageUnit.user.name}
                  </Link>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <DialogForm open={openEdit} title="Edit Storage Unit">
        <Form
          onClose={() => setOpenEdit(false)}
          storageUnit={storageUnit}
          sizes={sizes}
          users={users}
        />
      </DialogForm>
    </>
  );
}

StorageUnitInfo.defaultProps = {
  sizes: [{}],
  users: [{}],
};

StorageUnitInfo.propTypes = {
  storageUnit: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.shape({
      name: PropTypes.string,
      rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
};
