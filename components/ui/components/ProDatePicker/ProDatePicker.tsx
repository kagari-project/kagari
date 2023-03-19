import React from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

export type ProDatePickerProps = {
  name?: ControllerRenderProps['name'];
  onChange?: ControllerRenderProps['onChange'];
  onBlur?: ControllerRenderProps['onBlur'];
  value?: ControllerRenderProps['value'];
};
export const ProDatePicker = React.forwardRef<HTMLElement, ProDatePickerProps>(
  (props, ref) => {
    return <>sss</>;
  },
);
