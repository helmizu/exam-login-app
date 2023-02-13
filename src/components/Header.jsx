import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../lib/AuthProvider';
import { Stack } from '@mui/material';

export default function Header() {
  const { auth, signout } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: (theme) => theme.palette.common.black,
        bgcolor: (theme) => theme.palette.common.white,
      }}
    >
      <Toolbar>
        <Box flexGrow={1} textAlign="left">
          <Link to="/">
            <img src="/react.svg" alt="React logo" />
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" width={400} justifyContent="flex-end" alignItems="center">
          {!!auth && (
            <Box display="flex" flexDirection="row" gap={1} alignItems="center">
              <Typography ml={1}>{auth.email}</Typography>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </Box>
          )}
          {!auth && (
            <Stack direction="row" gap={2}>
              <Button onClick={() => navigate('/sign-in', { state: { from: location.pathname } })}>Sign In</Button>
              <Button onClick={() => navigate('/sign-up')} variant="contained">Sign Up</Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar >
  );
}