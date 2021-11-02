import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from '@inertiajs/inertia';
import Card from '@mui/material/Card';
import { Head } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import { Tooltip } from '@mui/material';
import { currencyFormat, dateFormat } from '@/Helpers/Formatters';

const openPage = ({ row }) => Inertia.visit(`/payments/${row?.id}`);
const visitUser = (userId) => Inertia.visit(`/users/${userId}`);

export default function Payments({ payments }) {
  const columns = [
    {
      field: 'id', headerName: 'ID', type: 'number', flex: 0, minWidth: 50,
    },
    {
      field: 'user',
      headerName: 'Customer',
      flex: 2,
      minWidth: 200,
      filterable: false,
      sortComparator: (
        v1, v2, cellParams1, cellParams2,
      ) => (cellParams1.value.name).localeCompare(cellParams2.value.name),
      renderCell: (params) => (
        <>
          {params.value.name}
          <Tooltip title={`Open ${params.value.name}`}>
            <IconButton
              aria-label={`Open ${params.value.name}`}
              onClick={() => visitUser(params.value.id)}
              size="small"
            >
              <LaunchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      ),
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
      field: 'paid_at',
      headerName: 'Payment Date',
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
    <>
      <Head title="Payments" />
      <Card sx={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <DataGrid
            autoHeight
            rows={payments}
            columns={columns}
            pageSize={25}
          />
        </div>
      </Card>
    </>
  );
}

Payments.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
