import React, { PropsWithChildren, useEffect, useState } from 'react';
import ProTable, { ColumnDef, RowDef } from '../ProTable/ProTable';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export type AsyncFunctionLike<TParams = unknown, TReturn = unknown> = (
  params?: TParams,
) => Promise<TReturn>;

export type ProRestfulProps = {
  columns: ColumnDef[];
  list: AsyncFunctionLike<unknown, { list: unknown[]; total: number }>;
};

export default function ProRestful(props: PropsWithChildren<ProRestfulProps>) {
  const { columns, list } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<RowDef[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    handleList();
  }, [list]);

  async function handleList() {
    setIsLoading(true);
    const returns = await list();
    setRows(returns.list);
    setTotal(returns.total);
    setIsLoading(false);
  }

  async function onPageChange(
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) {
    setIsLoading(true);
    await handleList();
    setPage(newPage);
    setIsLoading(false);
  }
  async function onRowsPerPageChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setIsLoading(true);
    await handleList();
    setRowsPerPage(Number(e.target.value));
    setIsLoading(false);
  }

  return (
    <Stack spacing={2} justifyContent={'center'} alignItems={'end'}>
      <Box sx={{ width: '100%', visibility: isLoading ? 'visible' : 'hidden' }}>
        <LinearProgress />
      </Box>
      <ProTable columns={columns} rows={rows} />
      <TablePagination
        component={'div'}
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Stack>
  );
}
