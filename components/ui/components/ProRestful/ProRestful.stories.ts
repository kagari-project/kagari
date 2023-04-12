import {ProRestful} from "./ProRestful";
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof ProRestful> = {
  title: 'Components/ProRestful',
  component: ProRestful,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string'
    },
    disableEnforceFocus: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'prop passed to internal modals'
    },
    disableAutoFocus: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'prop passed to internal modals'
    },
    mode: {
      type: 'string',
      control: { type: 'radio' },
      description: 'control create and edit form mode',
      options: ['drawer', 'modal', 'standalone-page']
    },
    columns: {
      description: 'ProTableProps[\'columns\']'
    },
    searchForm: {
      type: 'function',
      description: 'search form component'
    },
    createForm: {
      type: 'function',
      description: 'create form component'
    },
    editForm: {
      type: 'function',
      description: 'edit form component'
    },
    list: {
      type: 'function',
      description: 'list api function'
    },
    getOne: {
      type: 'function',
      description: 'getOne api function'
    },
    createOne: {
      type: 'function',
      description: 'createOne api unction'
    },
    updateOne: {
      type: 'function',
      description: 'updateOne api function'
    },
    deleteOne: {
      type: 'function',
      description: 'deleteOne api function'
    },
  }
}

export default meta
type Story = StoryObj<typeof ProRestful>

export const Default: Story = {
  args: {
    columns: [],
    title: 'Default ProRestful Page',
  }
}
