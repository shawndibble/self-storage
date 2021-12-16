import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Head } from '@inertiajs/inertia-react';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { currencyFormat } from '@/Helpers/Formatters';

export default function InvoiceDetails({ invoice }) {
  const { user } = invoice;
  return (
    <>
      <Head title="Invoice" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Box mb={2}><Button variant="outlined" fullWidth>Print</Button></Box>
              Status: Sent
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Card>
            <CardContent>
              <Grid container direction="row-reverse">
                <Grid item>
                  <Typography variant="body2" textAlign="right">
                    Issued:
                    {' '}
                    {invoice.created_at}
                    <br />
                    Due:
                    {' '}
                    {invoice.due_date}
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={2} mb={2} textAlign="center" width="100%">
                <Typography variant="h4">
                  #INV-00
                  {invoice.id}
                </Typography>
              </Box>
              <Grid container justifyContent="space-between" mb={3}>
                <Grid item>
                  <Typography variant="body2">
                    <strong>Pay To:</strong>
                    <br />
                    B.C. Mini Warehouses
                    <br />
                    14528 Wallisville Rd.
                    Houston, TX 77049
                    <br />
                    713-455-3926
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <strong>Bill To:</strong>
                    <br />
                    {user.name}
                    <br />
                    {user.full_address}
                  </Typography>
                </Grid>
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Description
                    </TableCell>
                    <TableCell>
                      Price
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.description}
                      </TableCell>
                      <TableCell align="right">
                        {currencyFormat(item.price)}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Tooltip title="Edit"><IconButton><EditIcon /></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton color="error"><DeleteIcon /></IconButton></Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow><TableCell colSpan={3} /></TableRow>
                  <TableRow>
                    <TableCell align="right">Total:</TableCell>
                    <TableCell align="right">{currencyFormat(invoice.amount)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      full_address: PropTypes.string,
    }),
    amount: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      price: PropTypes.number,
    })),
    created_at: PropTypes.string,
    due_date: PropTypes.string,
  }).isRequired,
};
