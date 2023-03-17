import React from 'react';
import { ProEditor } from './ProEditor';
import { ProForm, ProFormItem } from '../ProForm';
import Button from '@mui/material/Button';

export default {
  title: 'ProEditor',
  component: ProEditor,
};

export const Default = () => {
  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <ProForm defaultValues={{ content: 'ffff' }} onSubmit={onSubmit}>
      <ProFormItem
        prop={'content'}
        render={({ field: { value, onChange } }) => (
          <ProEditor
            value={value}
            onChange={onChange}
            apiKey={'axhtqrj8j26uon609azst3p14c2a0wuyukqmjmfcjjo6pjmx'}
          />
        )}
      />
      <Button type={'submit'}>submit</Button>
    </ProForm>
  );
};
