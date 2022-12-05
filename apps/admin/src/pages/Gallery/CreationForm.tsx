import React from 'react';
import { ProForm, ProFormItem } from '@kagari/ui/components/ProForm';
import { ProUpload } from '@kagari/ui/components/ProUpload';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CreateForm } from '@kagari/ui';

export const CreationForm: CreateForm = React.forwardRef(function (props, ref) {
  return (
    <Box component={Paper} sx={{ width: 400, margin: '10vh auto auto auto' }}>
      <ProForm onSubmit={props.handleCreate} sx={{ padding: 1 }}>
        <ProFormItem
          prop="files"
          render={({ name, field }) => (
            <>
              <InputLabel>{name}</InputLabel>
              <ProUpload {...field} multiple={false} />
            </>
          )}
        />

        <Box>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </ProForm>
    </Box>
  );
});
