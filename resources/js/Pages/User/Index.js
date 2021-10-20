import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Inertia } from "@inertiajs/inertia";

export default function Users(props) {
    const rows = props.users;
    const openPage = ({ row }) => {
        console.log(row);
        Inertia.visit(`/user/${row?.id}`);
    }
    const columns = [
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'email', headerName: 'email', type: 'email', flex: 2, minWidth: 250 },
        { field: 'is_admin', headerName: 'Admin', type: 'boolean', flex: 0 },
        { field: 'phone', headerName: 'Phone Number', flex: 2, minWidth: 200 },
        {
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<OpenInBrowserIcon />} onClick={() => openPage(params)} label="Open" />,
            ]
        }
    ];

    return (
        <div style={{ height: 'calc(100vh - 160px)', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={25}
                checkboxSelection
            />
        </div>
    )
}
