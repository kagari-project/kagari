import type {Meta, StoryObj} from "@storybook/react";

import {ProDatePicker} from "./ProDatePicker";

const meta: Meta<typeof ProDatePicker> = {
  title: 'Components/ProDatePicker',
  component: ProDatePicker,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: 'string',
      defaultValue: 'datetime',
      control: { type: 'radio' },
      description: '`time-range` and `datetime-range` is not supported yet. Will considering drop dependency `@mui/x-date-pickers`',
      options: ['date', 'time', 'datetime', 'date-range', 'time-range', 'datetime-range']
    },
    name: {
      type: 'string',
      description: 'field name prop',
      control: { type: 'input' }
    },
    onChange: {
      type: 'function'
    },
    onBlur: {
      type: 'function'
    },
    value: {}
  }
}

export default meta;
type Story = StoryObj<typeof ProDatePicker>

export const DatePicker: Story = {
  args: {
    variant: 'date'
  }
}
export const TimePicker: Story = {
  args: {
    variant: 'time'
  }
}

export const DateTimePicker: Story = {
  args: {
    variant: 'datetime'
  }
}

export const DateRangePicker: Story = {
  args: {
    variant: 'date-range'
  }
}
