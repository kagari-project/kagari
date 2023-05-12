import { ProTransferList } from "./ProTransferList";
import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

const meta: Meta<typeof ProTransferList> = {
  title: 'Components/ProTransfer',
  component: ProTransferList,
  argTypes: {
    onChange: {
      description: 'a callback fired when move from left to right(or the opposite direction)'
    },
    left: {
      description: 'props for configuring left side'
    },
    right: {
      description: 'props for configuring right side'
    },
  }
}

export default meta
type Story = StoryObj<typeof ProTransferList>

function seed(size : number) {
  return Array.from({ length: size }).map((_, i) => ({ id: i, name:  Math.random().toString(36).slice(2, 13) }))
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
      />
    </Box>
  }
}

export const Filterable: Story = {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onChange = () => {}
    return <Box>
      <ProTransferList
        left={{
          title: 'left',
          loadMore: loadMoreLeft,
          searchable: true,
          render: (item) => <>#{item.id} { item.name }</>,
        }}
        right={{
          title: 'right',
          searchable: true,
          loadMore: loadMoreRight,
          render: (item) => <>#{item.id} { item.name }</>,
        }}
        onChange={onChange}
      />
    </Box>
  }
}
