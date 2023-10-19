import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { ProForm, ProFormItem } from '@kagari/ui/components/ProForm';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Paper from '@mui/material/Paper';
import * as yup from 'yup';
import { login } from '../api';
import { useAuthStore } from '../store/auth.store';
import router from '../config/router';
import get from 'lodash/get';
import { onError, onResponse } from '../api/request';
import { AxiosResponse } from 'axios';

const loginFormSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function LoginPage() {
  const { login: setLoginInfo } = useAuthStore();

  const handleSubmit = useCallback(async (params: any) => {
    const {
      data: { data, accessToken, refreshToken },
    } = await (login(params)
      .then(onResponse)
      .catch(onError) as Promise<AxiosResponse>);
    setLoginInfo(data, accessToken, refreshToken);
    await router.navigate('/', { replace: true });
  }, []);

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ pt: '10vh' }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Login
      </Typography>
      <Paper>
        <ProForm
          onSubmit={handleSubmit}
          sx={{ padding: 1 }}
          schema={loginFormSchema}
        >
          <ProFormItem
            prop={'username'}
            render={({ field, formState }) => {
              return (
                <Box sx={{ mb: 1 }}>
                  <InputLabel required>{field.name}</InputLabel>
                  <Box>
                    <Input {...field} />
                    <FormHelperText error={!!get(formState.errors, field.name)}>
                      {get(formState.errors, `${field.name}.message`)}
                    </FormHelperText>
                  </Box>
                </Box>
              );
            }}
          />

          <ProFormItem
            prop={'password'}
            render={({ field, formState }) => {
              return (
                <Box sx={{ mb: 1 }}>
                  <InputLabel required>{field.name}</InputLabel>
                  <Input {...field} />
                  <FormHelperText error={!!get(formState.errors, field.name)}>
                    {get(formState.errors, `${field.name}.message`)}
                  </FormHelperText>
                </Box>
              );
            }}
          />

          <ProFormItem
            prop={'rememberMe'}
            render={({ field, formState }) => {
              return (
                <Box
                  sx={{ mb: 1 }}
                  display="flex"
                  flexDirection="row"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Checkbox {...field} />
                  <InputLabel>remember me</InputLabel>
                  <FormHelperText error={!!get(formState.errors, field.name)}>
                    {get(formState.errors, `${field.name}.message`)}
                  </FormHelperText>
                </Box>
              );
            }}
          />

          <Stack alignItems="center" justifyContent="center">
            <Button variant="contained" size="small" type="submit">
              Submit
            </Button>
          </Stack>
        </ProForm>
      </Paper>
    </Stack>
  );
}
