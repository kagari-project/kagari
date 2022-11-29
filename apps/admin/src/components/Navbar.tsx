import React, { useCallback, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useAuthStore } from '../store/auth.store';
import { useSettingStore } from '../store/setting.store';
import router from '../router';
import appConfig from '../config';

export default function Navbar() {
  const { logout, user } = useAuthStore();
  const { menuOpened, updateSettings } = useSettingStore();

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleLogout = useCallback(() => {
    logout();
    router.navigate(appConfig.loginUrl);
  }, [logout]);

  const toggleMenu = useCallback(() => {
    updateSettings({ menuOpened: !menuOpened });
  }, [menuOpened, updateSettings]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={toggleMenu}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button
            startIcon={
              <Avatar src={'https://ui-avatars.com/api/?background=random'} />
            }
            sx={{ color: '#fff' }}
            onClick={(e) => setAnchorElUser(e.currentTarget)}
          >
            {user?.username}
          </Button>

          <Menu
            sx={{ mt: '45px' }}
            open={Boolean(anchorElUser)}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem>
              <Typography onClick={handleLogout}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
