import React, { useState } from "react";
import type {Meta, StoryObj} from '@storybook/react'

import {ProDrawer} from "./ProDrawer";
import Button from "@mui/material/Button";

const meta: Meta<typeof ProDrawer> = {
  title: 'Components/ProDrawer',
  component: ProDrawer,
  tags: ['autodocs'],
  argTypes: {
    anchor: {
      type: "string",
      control: 'radio',
      options: ['left', 'right', 'bottom', 'top']
    },
  }
}

export default meta;
type Story = StoryObj<typeof ProDrawer>;

export const Default: Story = {
  render: (args, context) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)
    const onToggle = () => setIsOpen(!isOpen)
    return (
      <>
        <Button onClick={onToggle}>toggle!</Button>
        <ProDrawer {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
          this is content inside pro drawer
        </ProDrawer>
      </>
    )
  }
}
