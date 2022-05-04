import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from '@inertiajs/inertia';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Head } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import DialogForm from '@/Components/DialogForm';
import CreateFab from '@/Components/CreateFab';
import UserForm from './UserForm';

const openPage = ({ row }) => {
  Inertia.visit(`/users/${row?.id}`);
};

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar({ value, onChange, clearSearch }) {
  return (
    <TextField
      variant="standard"
      value={value}
      onChange={onChange}
      placeholder="Search Your List..."
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? 'visible' : 'hidden' }}
            onClick={clearSearch}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
      sx={{ xs: 1, sm: 'auto' }}
    />
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function Users({ users, storageUnits }) {
  const [searchText, setSearchText] = React.useState('');
  const [rows, setRows] = React.useState(users);
  const [openCreate, setOpenCreate] = React.useState(false);
  const createUser = () => setOpenCreate(true);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    /* eslint-disable arrow-body-style */
    const filteredRows = users.filter((row) => {
      return Object.keys(row).some((field) => {
        return row[field] && searchRegex.test(row[field].toString());
      });
    });
    /* eslint-enable arrow-body-style */
    setRows(filteredRows);
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
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              },
            }}
            autoHeight
            rows={rows}
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
