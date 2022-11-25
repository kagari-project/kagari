import React, { useState, useCallback, useMemo, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import List from '@mui/material/List';
import { LinearProgress } from '@mui/material';

export type ProInfiniteListProps<T = any> = {
  useWindow?: boolean;
  pageSize?: number;
  loader?: React.ReactNode;
  loadMore: (
    page?: number,
    pageSize?: number,
  ) => Promise<{ list: T[]; total: number }>;
  render: (item: any[]) => React.ReactNode;
};
export function ProInfiniteList(props: ProInfiniteListProps) {
  const {
    loadMore,
    render,
    useWindow = false,
    loader = <LinearProgress />,
    pageSize = 10,
  } = props;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [fetching, setFetching] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (fetching) {
      return;
    }

    setFetching(true);

    try {
      const { total, list } = await loadMore(page, pageSize);
      setItems([...items, ...list]);
      setTotal(total);
      setPage(page + 1);
    } finally {
      setFetching(false);
    }
  }, [items, fetching, page, pageSize]);

  useEffect(() => {
    handleLoadMore();
  }, []);

  return (
    <List sx={{ height: 400, overflow: 'auto' }}>
      <InfiniteScroll
        loadMore={handleLoadMore}
        hasMore={total > items.length}
        useWindow={useWindow}
        loader={loader}
      >
        {render(items)}
      </InfiniteScroll>
    </List>
  );
}
