import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';

const tableRow = (key, value) => (
  <TableRow>
    <TableCell align="right" valign="top">
      {key}
      :
    </TableCell>
    <TableCell>
      {value}
    </TableCell>
  </TableRow>
);

export default function UserInfo({ user }) {
  return (
    <>
      <CardContent>
        {!!user.is_admin && <Chip label="Admin" color="primary" size="small" style={{ float: 'right' }} />}
        <Typography variant="h5" textAlign="center">{user.name}</Typography>
      </CardContent>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="right" valign="top">
              Email:
            </TableCell>
            <TableCell>
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
    </>
  );
}

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
  }).isRequired,
};
