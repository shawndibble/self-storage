import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import React from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { router } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { currencyFormat, dateFormat } from '@/Helpers/Formatters';
import ConfirmationDialog from '@/Components/ConfirmationDialog';

export default function UserTransactions({ transactions }) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [rowParams, setRowParams] = React.useState({ type: '', amount: 0 });

  const typeURL = (row) => `/${row.type.toLowerCase()}s/${row.record_id}`;
  const openTransaction = (row) => router.get(typeURL(row));
  // eslint-disable-next-line no-console
  const editTransaction = (row) => console.log(row);
  const deleteTransaction = (row) => {
    setDeleteOpen(true);
    setRowParams(row);
  };

  const deleteConfirm = (row) => {
    router.delete(typeURL(row), {
      onSuccess: ({ props: { flash } }) => enqueueSnackbar(flash?.message, { variant: 'success' }),
    });
    setDeleteOpen(false);
  };

  // Transactions is a union, we need a unique id for data grid.
  const fixedTransactions = transactions.map((row, index) => {
    // eslint-disable-next-line no-param-reassign
    row.id = index + 1;
    return row;
  });

  const columns = [
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      minWidth: 100,
      type: 'singleSelect',
      valueOptions: ['Invoice', 'Payment'],
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      flex: 1,
      minWidth: 100,
      valueFormatter: (params) => currencyFormat(params.value),
      valueParser: (value) => Number(value) * 100,
    },
    {
      field: 'date',
      headerName: 'Transaction Date',
      type: 'dateTime',
      flex: 2,
      minWidth: 170,
      valueFormatter: (params) => dateFormat.format(new Date(params.value)),
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<OpenInBrowserIcon />} onClick={() => openTransaction(params.row)} label="Open" />,
        <GridActionsCellItem icon={<EditIcon />} onClick={() => editTransaction(params.row)} label="Edit" showInMenu />,
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteTransaction(params.row)} label="Delete" showInMenu />,
      ],
    },
  ];

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <DataGrid
            autoHeight
            rows={fixedTransactions}
            columns={columns}
            pageSize={25}
          />
        </div>
      </Card>
      <ConfirmationDialog
        title="Confirm Deletion"
        open={deleteOpen}
        onConfirm={() => deleteConfirm(rowParams)}
        onClose={() => setDeleteOpen(false)}
        description={
          `Are you sure you wish to delete the ${rowParams.type} for ${currencyFormat(rowParams.amount)} ?`
        }
      />
    </>
  );
}

UserTransactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
  })).isRequired,
};
