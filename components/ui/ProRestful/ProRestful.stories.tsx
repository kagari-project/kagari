import React from 'react';
import ProRestful from './ProRestful';
import Button from '@mui/material/Button';

export default {
  title: 'ProRestful',
  component: ProRestful,
};

export function Default() {
  const api = {
    list: async function () {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        list: Array.from({ length: 10 }).fill({
          username: 'foobar',
          password: 'foobar',
        }),
        total: 100,
      };
    },
    getOne: async function () {},
    createOne: async function () {},
    updateOne: async function () {},
    deleteOne: async function () {},
  };

  return (
    <ProRestful
      columns={[
        { prop: 'username' },
        { prop: 'password' },
        {
          buttons: (
            <>
              <Button>add</Button>
              <Button>delete</Button>
            </>
          ),
        },
      ]}
      {...api}
    />
  );
}
