import { CreateForm } from '@kagari/ui/components/ProRestful';
import { ProFormItem, ProForm } from '@kagari/ui';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';

export const CreationForm: CreateForm = function (props) {
  return (
    <ProForm onSubmit={props.handleCreate} sx={{ padding: 1 }}>
      <ProFormItem
        prop="name"
        render={({ field }) => (
          <>
            <InputLabel>{field.name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <ProFormItem
        prop="token"
        render={({ field }) => (
          <>
            <InputLabel>{field.name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </ProForm>
  );
};
