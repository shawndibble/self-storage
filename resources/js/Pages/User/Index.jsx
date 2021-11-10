import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from '@inertiajs/inertia';
import Card from '@mui/material/Card';
import { Head } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import DialogForm from '@/Components/DialogForm';
import UserForm from './UserForm';
import CreateFab from '@/Components/CreateFab';

const openPage = ({ row }) => {
  Inertia.visit(`/users/${row?.id}`);
};

export default function Users({ users, storageUnits }) {
  const [openCreate, setOpenCreate] = React.useState(false);
  const createUser = () => {
    Inertia.reload({
      preserveState: true,
      only: ['storageUnits'],
    });
    setOpenCreate(true);
  };

  const columns = [
    {
      field: 'name', headerName: 'Name', flex: 2, minWidth: 180,
    },
    {
      field: 'email', headerName: 'Email', type: 'email', flex: 2, minWidth: 200,
    },
    {
      field: 'is_admin', headerName: 'Admin', type: 'boolean', flex: 0,
    },
    {
      field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 140,
    },
    {
      field: 'storage_units',
      headerName: 'Units',
      flex: 0,
      minWidth: 50,
      renderCell: (params) => (params.value.flatMap((row) => row.name)).join(', '),
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
      <Head title="Customers" />
      <Card sx={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            pageSize={25}
          />
        </div>
      </Card>
      <DialogForm open={openCreate} title="Create User">
        <UserForm onClose={() => setOpenCreate(false)} storageUnits={storageUnits} />
      </DialogForm>
      <CreateFab label="Create User" onClick={createUser} />
    </>
  );
}

Users.defaultProps = {
  storageUnits: [{}],
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  storageUnits: PropTypes.arrayOf(PropTypes.object),
};
