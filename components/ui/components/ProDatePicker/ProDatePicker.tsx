import React, { PropsWithChildren } from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

export type ProDatePickerProps = {
  variant?:
    | 'date'
    | 'time'
    | 'datetime'
    | 'date-range'
    | 'time-range'
    | 'datetime-range';
  name?: ControllerRenderProps['name'];
  onChange?: ControllerRenderProps['onChange'];
  onBlur?: ControllerRenderProps['onBlur'];
  value?: ControllerRenderProps['value'];
};

export const ProDatePicker = React.forwardRef<HTMLElement, ProDatePickerProps>(
  (props, ref) => {
    function getComponent() {
      switch (props.variant) {
        case 'date':
          return DatePicker;
        case 'time':
          return TimePicker;
        case 'datetime':
          return DateTimePicker;
        case 'date-range':
          return DateRangePicker;
        default:
          return DateTimePicker;
      }
    }

    const Component = getComponent();

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component onChange={props.onChange} value={props.value} />
      </LocalizationProvider>
    );
  },
);
