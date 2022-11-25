import React, { useState } from 'react';
import { ProTransferList, ProTransferListProps } from './ProTransferList';
import { faker } from '@faker-js/faker';

export default {
  title: 'ProTransferList',
  component: ProTransferList,
};

const all = [];
async function loadMore(page = 0, pageSize = 10) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const generated = Array.from({ length: pageSize }).map(() => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(5),
  }));
  all.push(...generated);
  return {
    list: generated,
    total: 50,
  };
}

export function Default() {
  function render(item) {
    return item.title;
  }

  const [data, setData] = useState<any>({});

  const handleChange: ProTransferListProps['onChange'] = function handleChange(
    params,
  ) {
    setData(params);
  };

  return (
    <>
      <ProTransferList
        onChange={handleChange}
        left={{ loadMore, render }}
        right={{ loadMore, render }}
      />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
}
