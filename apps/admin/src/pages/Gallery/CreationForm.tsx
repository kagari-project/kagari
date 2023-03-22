import React from 'react';
import {
  ProForm,
  ProFormItem,
  ProFormProps,
} from '@kagari/ui/components/ProForm';
import { ProUpload } from '@kagari/ui/components/ProUpload';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

type CreationFormProps = {
  handleCreate: ProFormProps['onSubmit'];
};
export const CreationForm = React.forwardRef<unknown, CreationFormProps>(
  function (props, ref) {
    return (
      <Box component={Paper} sx={{ width: 400, margin: '10vh auto auto auto' }}>
        <ProForm onSubmit={props.handleCreate} sx={{ padding: 1 }}>
          <ProFormItem
            prop="files"
            render={({ field }) => (
              <>
                <InputLabel>{field.name}</InputLabel>
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
  },
);
