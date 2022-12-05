import React from 'react';
import { IFile, ProUpload } from './ProUpload';
import { ProForm, ProFormItem } from '../ProForm';
import Button from '@mui/material/Button';

export default {
  title: 'ProUpload',
  component: ProUpload,
};

function upload(file: IFile) {
  return new Promise<void>((resolve) => setTimeout(resolve, 3000));
}

export function Single() {
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <ProForm onSubmit={onSubmit}>
      <ProFormItem
        prop="files"
        render={({ name, field, formState }) => (
          <ProUpload {...field} upload={upload} multiple={false} />
        )}
      />

      <Button type="submit">submit</Button>
    </ProForm>
  );
}

export function Multiple() {
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <ProForm onSubmit={onSubmit}>
      <ProFormItem
        prop="files"
        render={({ name, field, formState }) => (
          <ProUpload {...field} upload={upload} />
        )}
      />

      <Button type="submit">submit</Button>
    </ProForm>
  );
}
