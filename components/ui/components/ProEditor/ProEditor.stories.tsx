import React, { useState } from "react";
import { ProEditor } from "./ProEditor";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProEditor> = {
  title: 'Components/ProEditor',
  component: ProEditor,
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: 'string',
    },
    onChange: {
      description: '`(e: string) => void`'
    }
  }
}

export default meta;
type Story = StoryObj<typeof ProEditor>

export const Default: Story = {
  render: (args, context) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string>('')
    const onChange = (e) => setValue(e)
    return (
      <>
        <ProEditor value={value} onChange={onChange}/>
        <div>{ value }</div>
      </>
    )
  }
}
