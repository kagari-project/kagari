import React from 'react';

import { ProFormItem, ProForm } from './ProForm';
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
      <ProFormItem
        prop={'username'}
        render={({ field, formState }) => {
          return (
            <Box>
              <InputLabel required>{field.name}</InputLabel>
              <Box>
                <Input {...field} />
                <FormHelperText error={!!formState.errors[field.name]}>
                  {formState.errors[field.name]?.message as string}
                </FormHelperText>
              </Box>
            </Box>
          );
        }}
      />

      <ProFormItem
        prop={'password'}
        render={({ field, formState }) => {
          return (
            <Box>
              <InputLabel required>password</InputLabel>
              <Input {...field} />
              <FormHelperText error={!!formState.errors[field.name]}>
                {formState.errors[field.name]?.message as string}
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
