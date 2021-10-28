import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from '@inertiajs/inertia';
import Card from '@mui/material/Card';
import { Head } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { useSnackbar } from 'notistack';

const openPage = ({ row }) => Inertia.visit(`/storage-unit/${row?.id}`);
const visitUser = (userId) => Inertia.visit(`/user/${userId}`);

export default function StorageUnits({ storageUnits }) {
  const { enqueueSnackbar } = useSnackbar();

  const toggleLock = ({ row }) => Inertia.patch(`/storage-unit/${row?.id}`, {
    is_locked: row.is_locked ? 0 : 1,
  }, {
    onSuccess: ({ props: { flash } }) => enqueueSnackbar(flash?.message, { variant: 'success' }),
  });

  const columns = [
    {
      field: 'name', headerName: 'Unit', flex: 0, minWidth: 50,
    },
    {
      field: 'size', headerName: 'Size', flex: 0, minWidth: 100, valueFormatter: (params) => params.value.name,
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
      field: 'is_locked',
      headerName: 'Locked',
      type: 'boolean',
      flex: 0,
      renderCell: (params) => (params.value ? <Lock color="error" /> : <LockOpen color="disabled" />),
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<OpenInBrowserIcon />} onClick={() => openPage(params)} label="Open" />,
        <GridActionsCellItem icon={<Lock />} onClick={() => toggleLock(params)} label="Toggle Lock" showInMenu />,
      ],
    },
  ];

  return (
    <>
      <Head title="Storage Units" />
      <Card sx={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <DataGrid
            autoHeight
            rows={storageUnits}
            columns={columns}
            pageSize={25}
          />
        </div>
      </Card>
    </>
  );
}

StorageUnits.propTypes = {
  storageUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
