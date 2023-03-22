import { SearchForm } from '@kagari/ui/components/ProRestful';
import { ProFormItem, ProForm } from '@kagari/ui';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

export const FilterForm: SearchForm = function (props) {
  const onSubmit = (formData: any) => {
    props.handleList({ username: formData.search });
  };
  return (
    <ProForm inline onSubmit={onSubmit}>
      <ProFormItem
        prop={'search'}
        render={({ field }) => {
          return <Input {...field} placeholder={field.name} />;
        }}
      />
      <IconButton type="submit">
        <SearchIcon color="primary" />
      </IconButton>
    </ProForm>
  );
};
