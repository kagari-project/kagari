import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useSettingStore } from '../store/setting.store';
import Navbar from '../components/Navbar';
import { ProMenuBar } from '@kagari/ui/components/ProMenuBar';
import routes from '../config/routes';
import Loading from '../components/Loading';

export default function Authenticated() {
  const { getProfile } = useAuthStore();
  const { menuOpened } = useSettingStore();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      <Stack sx={{ flexGrow: 1, height: '100%' }}>
        <Navbar />
        <Stack direction={'row'} sx={{ height: '100%' }}>
          <ProMenuBar menu={routes} opened={menuOpened} sx={{ boxShadow: 3 }} />
          <Box component="main" flexGrow="1">
            <Outlet></Outlet>
          </Box>
        </Stack>
      </Stack>
    </React.Suspense>
  );
}
