import {
  OptionsObject,
  useSnackbar,
  WithSnackbarProps,
  SnackbarProvider as SnackbarProviderBase,
  SnackbarProviderProps,
} from 'notistack';
import React, { PropsWithChildren } from 'react';

// Must be imported at least once in the app to initialize the ref
let snackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

export function SnackbarProvider({
  children,
  ...props
}: PropsWithChildren<SnackbarProviderProps>) {
  return (
    <SnackbarProviderBase {...props}>
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProviderBase>
  );
}

export const snackbar = {
  success(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'success' });
  },
  warning(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'warning' });
  },
  info(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'info' });
  },
  error(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'error' });
  },
  toast(msg: string, options: OptionsObject = {}): void {
    snackbarRef.enqueueSnackbar(msg, options);
  },
};
