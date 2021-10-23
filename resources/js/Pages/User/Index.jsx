import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from '@inertiajs/inertia';
import Card from '@mui/material/Card';
import { Head } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';

const openPage = ({ row }) => {
  Inertia.visit(`/user/${row?.id}`);
};

export default function Users({ site, users }) {
  const columns = [
    {
      field: 'name', headerName: 'Name', flex: 1, minWidth: 150,
    },
    {
      field: 'email', headerName: 'email', type: 'email', flex: 2, minWidth: 250,
    },
    {
      field: 'is_admin', headerName: 'Admin', type: 'boolean', flex: 0,
    },
    {
      field: 'phone', headerName: 'Phone Number', flex: 2, minWidth: 200,
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
      <Head title={`Customers - ${site.name}`} />
      <Card sx={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            pageSize={25}
            checkboxSelection
          />
        </div>
      </Card>
    </>
  );
}

Users.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
