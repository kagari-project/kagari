import React from 'react';
import { ProDatePicker } from './ProDatePicker';
import { ProForm, ProFormItem } from '../ProForm';
import Button from '@mui/material/Button';

export default {
  title: 'ProDatePicker',
  component: ProDatePicker,
};

export function DatePicker() {
  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <ProForm onSubmit={onSubmit}>
      <ProFormItem
        prop={'date'}
        render={({ field }) => <ProDatePicker {...field} />}
      />
      <Button type="submit">submit</Button>
    </ProForm>
  );
}
