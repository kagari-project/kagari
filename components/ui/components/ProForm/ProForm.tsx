import React, { FormEvent, PropsWithChildren, ReactElement } from 'react';
import {
  useForm,
  FormProvider,
  useFormContext,
  UseFormRegisterReturn,
  useFormState,
  UseFormStateReturn,
  Control,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SxProps } from '@mui/system/styleFunctionSx';
import { styled } from '@mui/system';
import {
  ControllerFieldState,
  ControllerRenderProps,
} from 'react-hook-form/dist/types/controller';

export type ProFormProps = PropsWithChildren<{
  inline?: boolean;
  onSubmit?: (data: unknown) => void;
  defaultValues?: Record<string, unknown>;
  sx?: SxProps;
  schema?: yup.AnyObjectSchema;
}>;

const StyledForm = styled('form')<{
  onSubmit: (e: FormEvent) => void;
  sx?: SxProps;
}>({}, {});

export function ProForm(props: ProFormProps) {
  const { inline, onSubmit, schema, defaultValues = {} } = props;
  const form = useForm({
    mode: 'all',
    defaultValues,
    resolver: schema ? yupResolver(schema) : null,
  });

  return (
    <FormProvider {...form}>
      <StyledForm
        onSubmit={form.handleSubmit(onSubmit)}
        sx={{
          ...props.sx,
          display: 'flex',
          flexDirection: inline ? 'row' : 'column',
        }}
      >
        {props.children}
      </StyledForm>
    </FormProvider>
  );
}

/**
 * @param props
 * @constructor
 */
export function ProFormItem(
  props: PropsWithChildren<{
    prop: string;
    render: (props: {
      field: ControllerRenderProps;
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<unknown>;
    }) => React.ReactElement;
  }>,
) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.prop}
      control={control}
      render={({ field, fieldState, formState }) =>
        props.render({ field, fieldState, formState })
      }
      // render={(params) => {
      //   return React.cloneElement(
      //     React.Children.only(props.children) as ReactElement,
      //     {
      //       onChange,
      //       onBlur,
      //       value,
      //       error,
      //     },
      //   );
      // }}
    />
  );
}
