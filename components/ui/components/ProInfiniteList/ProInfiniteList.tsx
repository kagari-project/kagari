import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useImperativeHandle,
} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import List from '@mui/material/List';
import { LinearProgress } from '@mui/material';

export type ProInfiniteListProps<T = any> = {
  useWindow?: boolean;
  height?: number;
  pageSize?: number;
  loader?: React.ReactNode;
  loadMore: (
    page?: number,
    pageSize?: number,
  ) => Promise<{ list: T[]; total: number }>;
  render: (item: any[]) => React.ReactNode;
};
export const ProInfiniteList = React.forwardRef(function (
  props: ProInfiniteListProps,
  ref,
) {
  const {
    loadMore,
    render,
    useWindow = false,
    loader = <LinearProgress />,
    pageSize = 10,
    height = 400,
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
  const init = useCallback(async () => {
    setItems([]);
    setPage(0);
    setTotal(0);
    await handleLoadMore();
  }, [items, page, total]);

  useImperativeHandle(
    ref,
    () => ({
      init,
    }),
    [total, page, items],
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <List sx={{ height, overflow: 'auto' }}>
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
});
