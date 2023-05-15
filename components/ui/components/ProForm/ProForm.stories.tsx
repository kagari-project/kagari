import React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import { ProForm, ProFormItem } from "./ProForm";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const meta: Meta<typeof ProForm> = {
  title: 'Components/ProForm',
  component: ProForm,
  tags: ['autodocs'],
  // subcomponents: [ProFormItem]
}


export default meta
type Story = StoryObj<typeof ProForm>

export const Default: Story = {
  render: () => {
    const onSubmit = (data) => alert(JSON.stringify(data))

    return (
      <ProForm onSubmit={onSubmit}>
        <ProFormItem
          prop='name'
          render={({ field }) => <>
            <InputLabel>{field.name}</InputLabel>
            <Input {...field}></Input>
          </>}
        />
        <Button type="submit">Submit</Button>
      </ProForm>
    )
  }
}
