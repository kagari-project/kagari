import React from 'react';

import ProForm from './Form';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import * as yup from 'yup';

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
  };

  return (
    <ProForm
      schema={schema}
      {...args}
      onSubmit={onSubmit}
      render={(props) => {
        return (
          <>
            <FormControl>
              <InputLabel shrink={false}>username</InputLabel>
              <Input sx={{ pl: 12 }} {...props.register('username')} />
              <FormHelperText error={!!props.formState.errors.username}>
                {props.formState.errors.username?.message as string}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel shrink={false}>password</InputLabel>
              <Input sx={{ pl: 12 }} {...props.register('password')} />
              <FormHelperText error={!!props.formState.errors.password}>
                {props.formState.errors.password?.message as string}
              </FormHelperText>
            </FormControl>

            <Box>
              <Button variant={'contained'} color={'primary'} type={'submit'}>
                submit
              </Button>
            </Box>
          </>
        );
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  inline: false,
};
