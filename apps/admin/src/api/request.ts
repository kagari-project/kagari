import axios, { AxiosError } from 'axios';
import { authStore } from '../store/auth.store';
import set from 'lodash/set';
import appConfig from '../config';
import { snackbar } from '@kagari/ui/utils/ProSnackbar';

const $http = axios.create({ baseURL: appConfig.baseURL });
export const $request = axios.create({
  baseURL: appConfig.baseURL,
});

$http.interceptors.request.use((config) => {
  const accessToken = authStore.getState().accessToken;
  set(config, `headers[${appConfig.tokenField ?? 'x-token'}]`, accessToken);
  return config;
});

$http.interceptors.response.use(
  (res) => {
    if (res.data.error) {
      snackbar.error(res.data.message ?? res.data.error, {
        autoHideDuration: 5000,
      });
      throw new AxiosError(
        res.data.message,
        res.data.error,
        res.config,
        res.request,
        res,
      );
    }
    return res;
  },
  (error) => {
    snackbar.error(error.message, {
      autoHideDuration: 5000,
    });
    throw error;
  },
);

export default $http;
