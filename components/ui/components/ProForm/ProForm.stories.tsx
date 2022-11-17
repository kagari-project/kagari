import React from 'react';

import { FormItem, ProForm } from './ProForm';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';

export default {
  title: 'ProForm',
  component: ProForm,
  argTypes: {
    inline: {
      control: { type: 'boolean' },
    },
  },
};

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Template = (args) => {
  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <ProForm schema={schema} {...args} onSubmit={onSubmit}>
      <FormItem
        prop={'username'}
        render={({ name, field, formState }) => {
          return (
            <Box sx={{ mb: 1 }}>
              <InputLabel required>{name}</InputLabel>
              <Box>
                <Input {...field} />
                <FormHelperText error={!!formState.errors[name]}>
                  {formState.errors[name]?.message as string}
                </FormHelperText>
              </Box>
            </Box>
          );
        }}
      />

      <FormItem
        prop={'password'}
        render={({ name, field, formState }) => {
          return (
            <Box sx={{ mb: 1 }}>
              <InputLabel required>{name}</InputLabel>
              <Input {...field} />
              <FormHelperText error={!!formState.errors[name]}>
                {formState.errors[name]?.message as string}
              </FormHelperText>
            </Box>
          );
        }}
      />

      <Box>
        <Button variant={'contained'} color={'primary'} type={'submit'}>
          submit
        </Button>
      </Box>
    </ProForm>
  );
};

export const Default = Template.bind({});
Default.args = {
  inline: false,
};
