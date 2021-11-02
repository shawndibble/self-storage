import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import React from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from '@inertiajs/inertia';
import PropTypes from 'prop-types';
import { currencyFormat, dateFormat } from '@/Helpers/Formatters';

export default function UserTransactions({ transactions }) {
  const typeURL = (params) => `/${params.row.type.toLowerCase()}s/${params.id}`;
  const openPage = (params) => Inertia.get(typeURL(params));

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
        <GridActionsCellItem icon={<OpenInBrowserIcon />} onClick={() => openPage(params)} label="Open" />,
      ],
    },
  ];

  return (
    <Card sx={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          rows={transactions}
          columns={columns}
          pageSize={25}
        />
      </div>
    </Card>
  );
}

UserTransactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
  })).isRequired,
};
