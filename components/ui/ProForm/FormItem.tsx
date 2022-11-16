/** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { css } from '@emotion/react';

export type FormItemProps = {
  label?: string | React.ReactNode;
  props?: string;
  labelWidth?: string | number;
  align?: 'left' | 'right';
};

export default function FormItem(props: PropsWithChildren<FormItemProps>) {
  return (
    <div css={css({ mb: 1, mr: 1 })}>
      <div
        css={css({
          marginRight: 8,
          display: 'inline-block',
          width: props.labelWidth ?? 100,
          textAlign: props.align ?? 'right',
        })}
      >
        {props.label}
      </div>
      {props.children}
    </div>
  );
}
