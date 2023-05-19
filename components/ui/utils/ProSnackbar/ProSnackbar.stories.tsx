import { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider, snackbar } from './ProSnackbar'
import Button from "@mui/material/Button";

const meta: Meta<typeof SnackbarProvider> = {
  title: 'Utils/ProSnackbar',
  component: SnackbarProvider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SnackbarProvider>

export const Default: Story = {
  render() {
    return (
      <SnackbarProvider>
        <Button onClick={() => snackbar.info('hello, baby!')}>trigger</Button>
      </SnackbarProvider>
    )
  }
}
