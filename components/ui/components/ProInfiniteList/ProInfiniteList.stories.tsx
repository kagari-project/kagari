import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProInfiniteList } from "./ProInfiniteList";
import ListItem from "@mui/material/ListItem";
import { LinearProgress } from "@mui/material";

const meta : Meta<typeof ProInfiniteList> = {
  title: 'Components/ProInfiniteList',
  component: ProInfiniteList,
  tags: ['autodocs'],
  argTypes: {
    loadMore: {
      type: 'function',
      description: 'get data function, `(page?: number, pageSize?: number) => Promise<{ list: any[], total: number }>}`'
    },
    render: {
      type: 'function',
      description: 'a render function to render list items, `(items: any[]) => JSX.Element`'
    },
    useWindow: {
      type: 'boolean',
      description: 'see react-infinite-scroller useWindow prop'
    },
    height: {
      type: 'number'
    },
    pageStart: {
      type: 'number'
    },
    pageSize: {
      type: 'number'
    },
    loader: {
      type: 'function',
      description: 'a react node displayed when loading data',
    },
    searchable: {
      type: 'boolean',
      description: 'if searchable'
    },
    filter: {
      type: 'function',
      description: 'a function filter list items when searching(search in loaded list)'
    }
  },
  args: {
    searchable: false,
    useWindow: false,
    filter:  (s, item) => item.name.indexOf(s) >= 0,
    loader: <LinearProgress key={'loader'} />,
    pageStart: 1,
    pageSize: 10,
    height: 400,
  }
}

export default meta
type Story = StoryObj<typeof ProInfiniteList>

export const Default: Story = {
  args: {
    async loadMore() {
      return {
        list: Array.from({ length: 20 })
          .map((_, i) => ({
            id: i,
            name: 'ssss'
          }))
      }
    },
    render(items) {
      return items.map(item => <ListItem key={item.id}>#{item.id} { item.name }</ListItem>)
    }
  }
}

export const Searchable: Story = {
  args: {
    searchable: true,
    filter:  (s, item) => item.name.indexOf(s) >= 0,
    async loadMore() {
      return {
        list: Array.from({ length: 20 })
          .map((_, i) => ({
            id: i,
            name: Math.random().toString(36).slice(2, 13)
          }))
      }
    },
    render(items) {
      return items.map(item => <ListItem key={item.id}>#{item.id} { item.name }</ListItem>)
    }
  }
}
