import React, {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle, useMemo
} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import List from '@mui/material/List';
import { LinearProgress } from '@mui/material';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";

export type ProInfiniteListProps<T = any> = {
  useWindow?: boolean;
  height?: number;
  pageStart?: number
  pageSize?: number;
  loader?: React.ReactNode;
  searchable?: boolean;
  filter?: (searchKey: string, item: T) => boolean
  loadMore: (
    page?: number,
    pageSize?: number,
  ) => Promise<{ list: T[]; total: number }>;
  render: (item: any[]) => React.ReactNode;
};
export const ProInfiniteList = React.forwardRef<{ init: () => void, items: unknown[] }, ProInfiniteListProps>(function (
  props,
  ref,
) {
  const {
    loadMore,
    render,
    searchable = false,
    filter = (s, item) => item.name.indexOf(s) >= 0,
    useWindow = false,
    loader = <LinearProgress key={'loader'} />,
    pageStart = 1,
    pageSize = 10,
    height = 400,
  } = props;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(pageStart);
  const [total, setTotal] = useState(0);
  const [searchKey, setSearchKey] = useState<string>('')

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
    setPage(pageStart);
    setTotal(0);
    await handleLoadMore();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      init,
      items,
    }),
    [items],
  );

  useEffect(() => {
    init();
  }, []);

  const list = useMemo(() => {
    if (!filter) {
      return items
    }
    if (!searchKey) {
      return items
    }
    return items.filter((item) => filter(searchKey, item))
  }, [searchKey, items])

  return (
    <>
      {
        searchable
          ? (
            <Box sx={{ padding: '8px 16px' }}>
              <Input
                value={searchKey}
                sx={{ width: '100%' }}
                onChange={(e) => {
                  setSearchKey(e.target.value)
                }}
                endAdornment={
                  <IconButton onClick={() => setSearchKey('')}>
                    <ClearIcon></ClearIcon>
                  </IconButton>
                }
              />
            </Box>
          )
          : null
      }
      <List sx={{ height, overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={pageStart}
          loadMore={handleLoadMore}
          hasMore={total > items.length}
          useWindow={useWindow}
          loader={loader}
        >
          {render(list)}
        </InfiniteScroll>
      </List>
    </>
  );
});
