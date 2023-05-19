import React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import { DialogProvider, dialog } from "./ProDialog";
import Button from '@mui/material/Button'

const meta: Meta = {
  title: 'Utils/ProDialog',
  component: DialogProvider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DialogProvider>

export const Default: Story = {
  render() {
    return (
      <DialogProvider>
        <Button onClick={() => dialog.show({
          title: 'Alert!',
          content: 'detailed message',
          buttons: [
            {
              text: 'Confirm',
              onClick: () => {
                dialog.close()
                window.alert('clicked confirm')
              }
            },
            {
              text: 'Dismiss',
              onClick: () => {
                dialog.close()
                window.alert('clicked dismiss')
              }
            }
          ]
        }) }>trigger</Button>
      </DialogProvider>
    )
  }
}
