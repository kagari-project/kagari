import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { authStore } from '../store/auth.store';
import set from 'lodash/set';
import appConfig from '../config';
import { snackbar } from '@kagari/ui/utils/ProSnackbar';
import router from '../config/router';
import config from '../config';

const $http = axios.create({ baseURL: appConfig.baseURL });
export const $request = axios.create({
  baseURL: appConfig.baseURL,
});

export function onRequest(config: InternalAxiosRequestConfig) {
  const accessToken = authStore.getState().accessToken;
  set(config, `headers[${appConfig.tokenField ?? 'x-token'}]`, accessToken);
  return config;
}

$http.interceptors.request.use(onRequest);

export function onResponse(res: AxiosResponse) {
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
}

export function onError(error: AxiosError) {
  snackbar.error(error.message, {
    autoHideDuration: 5000,
  });
  if (error.response?.status === 401) {
    router.navigate(config.loginUrl);
  }

  if (error.response?.status === 403) {
    snackbar.error('Permission Denied');
  }

  throw error;
}

$http.interceptors.response.use(onResponse, onError);

export default function request<T>(config: AxiosRequestConfig) {
  return $http(config) as Promise<AxiosResponse<T>>;
}
