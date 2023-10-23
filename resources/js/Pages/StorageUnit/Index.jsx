import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { router, Head } from '@inertiajs/react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { useSnackbar } from 'notistack';
import DialogForm from '@/Components/DialogForm';
import Form from '@/Pages/StorageUnit/Form';
import VisitUser from '@/Components/DataTable/VisitUser';
import CreateFab from '@/Components/CreateFab';

const openPage = ({ row }) => router.visit(`/storage-units/${row?.id}`);
const visitUser = (userId) => router.visit(`/users/${userId}`);

export default function StorageUnits({ storageUnits, sizes }) {
  const { enqueueSnackbar } = useSnackbar();

  const [openForm, setOpenForm] = React.useState(false);
  const createStorageUnit = () => setOpenForm(true);

  const toggleLock = ({ params: { row } }) => router.patch(
    `/storage-units/${row?.id}`,
    { is_locked: row.is_locked ? 0 : 1 },
    {
      onSuccess: ({ props: { flash } }) => enqueueSnackbar(flash?.message, { variant: 'success' }),
    },
  );

  const ViewPageLink = React.useCallback(
    (params) => <GridActionsCellItem icon={<OpenInBrowserIcon />} onClick={() => openPage(params)} label="Open" />,
    [],
  );

  const ToggleLockLink = React.useCallback(
    (params) => <GridActionsCellItem icon={<Lock />} onClick={() => toggleLock(params)} label="Toggle Lock" showInMenu />,
    [],
  );

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
      minWidth: 210,
      filterable: false,
      sortComparator: (
        v1,
        v2,
        cellParams1,
        cellParams2,
      ) => (cellParams1.value?.name)?.localeCompare(cellParams2.value?.name),
      renderCell: ({ value }) => value?.name && (<VisitUser visitUser={visitUser} value={value} />),
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
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <ViewPageLink params={params} />,
        <ToggleLockLink params={params} showInMenu />,
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
      <DialogForm open={openForm} title="Create Storage Unit">
        <Form
          onClose={() => setOpenForm(false)}
          storageUnits={storageUnits}
          sizes={sizes}
        />
      </DialogForm>
      <CreateFab label="Create Storage Unit" onClick={createStorageUnit} />
    </>
  );
}

StorageUnits.defaultProps = {
  sizes: [{}],
};

StorageUnits.propTypes = {
  storageUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object),
};
