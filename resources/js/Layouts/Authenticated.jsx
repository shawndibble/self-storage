import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Slide from '@mui/material/Slide';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import { ErrorContext } from '@/Helpers/ErrorContext';
import NavItems from './NavItems';
import PageName from './PageName';

function Copyright({ site, ...props }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={site.url}>
        {site.name}
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

Copyright.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
      }),
    },
  }),
);

const mdTheme = createTheme();

function Layout({ children }) {
  const { site, errors } = children.props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const breadcrumbs = () => {
    const level2 = children.props.user?.name || false;
    return (
      <>
        {' '}
        <NavigateNextIcon fontSize="small" />
        {' '}
        {PageName(children?.type.name)}
        {!!level2 && (
          <>
            <NavigateNextIcon fontSize="small" />
            {` ${level2}`}
          </>
        )}
      </>
    );
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <ErrorContext.Provider value={errors}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Slide}
        >
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{ marginRight: '10px' }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  {site?.name}
                  {breadcrumbs()}
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar />
              <NavItems page={children.type?.name} />
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900]),
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                <Grid container spacing={0}>
                  {children}
                </Grid>
                <Copyright sx={{ pt: 3 }} site={site} />
              </Container>
            </Box>
          </Box>
        </SnackbarProvider>
      </ErrorContext.Provider>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.shape({
    props: PropTypes.shape({
      site: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
      errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    }),
    type: PropTypes.func,
  }),
};

export default function Authenticated(children) {
  return <Layout>{children}</Layout>;
}
