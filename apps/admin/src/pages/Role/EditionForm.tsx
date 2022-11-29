import { EditForm } from '@kagari/ui/components/ProRestful';
import { FormItem, ProForm } from '@kagari/ui';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';

export const EditionForm: EditForm = function (props) {
  const onSubmit = (formData: any) => props.handleEdit(formData.id, formData);
  return (
    <ProForm
      onSubmit={onSubmit}
      sx={{ padding: 1 }}
      defaultValues={props.data as any}
    >
      <FormItem
        prop="name"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <FormItem
        prop="token"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
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
