import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import DomainIcon from '@mui/icons-material/Domain';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Inertia } from "@inertiajs/inertia";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";


export default function NavItems() {
    const [path, setPath] = React.useState(window.location.pathname)

    const navigateTo = (url, method = 'GET') => Inertia.visit(url, {
        onStart: (visit) => setPath(visit?.url?.pathname),
        method
    })

    return (
        <div style={{
            minHeight: 'calc(100vh - 65px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <List>
                <ListItemButton
                    onClick={() => navigateTo('/dashboard')}
                    selected={path === '/dashboard'}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => navigateTo('/payment')}
                    selected={path === '/payment'}
                >
                    <ListItemIcon>
                        <PaymentsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payments" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => navigateTo('/user')}
                    selected={path === '/user'}
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => navigateTo('/storage-unit')}
                    selected={path === '/storage-unit'}
                >
                    <ListItemIcon>
                        <DomainIcon />
                    </ListItemIcon>
                    <ListItemText primary="Storage Units" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => navigateTo('/settings')}
                    selected={path === '/settings'}
                >
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>

            <div>
                <Divider />
                <List>
                    <ListItemButton onClick={() => navigateTo('/logout', 'POST')}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </div>

        </div>
    )
}
