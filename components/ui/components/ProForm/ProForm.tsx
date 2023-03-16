import React, { FormEvent, PropsWithChildren } from 'react';
import {
    useForm,
    FormProvider,
    useFormContext,
    UseFormRegisterReturn,
    useFormState,
    UseFormStateReturn, Control,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SxProps } from '@mui/system/styleFunctionSx';
import { styled } from '@mui/system';

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
 * @deprecated use ProFormItem instead
 * @param props
 * @constructor
 */
export function FormItem(
  props: PropsWithChildren<{
    prop: string;
    render: (props: {
      name: string;
      field: UseFormRegisterReturn;
      formState: UseFormStateReturn<any>;
      control: Control<any>
    }) => React.ReactElement;
  }>,
) {
  const { register, control } = useFormContext();
  const formState = useFormState({ name: props.prop });
  const registered = register(props.prop);

  return (
    <>{props.render({ name: props.prop, field: registered, formState, control })}</>
  );
}

export const ProFormItem = FormItem;
