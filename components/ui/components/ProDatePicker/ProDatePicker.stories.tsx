import React from 'react';
import { ProDatePicker } from './ProDatePicker';
import { ProForm, ProFormItem } from '../ProForm';
import Button from '@mui/material/Button';

export default {
  title: 'ProDatePicker',
  component: ProDatePicker,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'date',
        'time',
        'datetime',
        'date-range',
        'time-range',
        'datetime-range',
      ],
    },
  },
};

export function DatePicker(args) {
  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <ProForm onSubmit={onSubmit}>
      <ProFormItem
        prop={'date'}
        render={({ field }) => <ProDatePicker {...args} {...field} />}
      />
      <Button type="submit">submit</Button>
    </ProForm>
  );
}
