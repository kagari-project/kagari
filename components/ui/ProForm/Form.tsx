/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type ProFormProps = PropsWithChildren<{
  inline?: boolean;
  onSubmit?: (data: unknown) => void;
  defaultValues?: Record<string, unknown>;
  schema?: yup.AnyObjectSchema /* todo typing */;
  render: (
    props: PropsWithChildren<
      Omit<
        UseFormReturn & {
          defaultValues: Record<string, unknown>;
        },
        'handleSubmit'
      >
    >,
  ) => React.ReactNode;
}>;

export default function ProForm(props: ProFormProps) {
  const { inline, onSubmit, schema, defaultValues = {} } = props;
  const { handleSubmit, ...useFormReturns } = useForm({
    mode: 'all',
    defaultValues,
    resolver: schema ? yupResolver(schema as unknown as any) : null,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css({ display: 'flex', flexDirection: inline ? 'row' : 'column' })}
    >
      {props.render({ defaultValues, ...useFormReturns })}
    </form>
  );
}
