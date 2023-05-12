import { ProTransferList } from "./ProTransferList";
import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

const meta: Meta<typeof ProTransferList> = {
  title: 'Components/ProTransfer',
  component: ProTransferList,
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      type: "function"
    },
  }
}

export default meta
type Story = StoryObj<typeof ProTransferList>

function seed(size : number) {
  return Array.from({ length: size }).map((_, i) => ({ id: i, name: 'foobar' }))
}

const loadMoreLeft = (page = 1, pageSize = 10) => {
  const total = 31
  const totalPages = Math.ceil(total / pageSize)
  return new Promise<{ list: any[], total: number }>((resolve) => {

    setTimeout(() => {
      if (page < totalPages) {
        return resolve({ list: seed(pageSize), total })
      } else if (page === totalPages) {
        return resolve({ list: seed(pageSize - (page * pageSize - total)), total })
      } else {
        return resolve({ list: [], total })
      }
    }, 500)
  })
}

const loadMoreRight = (page = 1, pageSize = 10) => {
  const total = 12
  const totalPages = Math.ceil(total / pageSize)
  return new Promise<{ list: any[], total: number }>((resolve) => {

    setTimeout(() => {
      if (page < totalPages) {
        return resolve({ list: seed(pageSize), total })
      } else if (page === totalPages) {
        return resolve({ list: seed(pageSize - (page * pageSize - total)), total })
      } else {
        return resolve({ list: [], total })
      }
    }, 500)
  })
}

export const Default: Story = {
  render() {
    const onChange = () => {}
    return <Box>
      <ProTransferList
        left={{
          title: 'left',
          loadMore: loadMoreLeft,
          render: (item) => <>#{item.id} { item.name }</>,
        }}
        right={{
          title: 'right',
          loadMore: loadMoreRight,
          render: (item) => <>#{item.id} { item.name }</>,
        }}
        onChange={onChange}
      />
    </Box>
  }
}
