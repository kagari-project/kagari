import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import {
  ProTable,
  ProTableProps,
} from '@kagari/ui/components/ProTable/ProTable';
import TablePagination from '@mui/material/TablePagination';
import Drawer from '@mui/material/Drawer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ApiTypes = {
  list: (...args) => Promise<{ list: any[]; total: number }>;
  getOne: (...args) => Promise<any>;
  createOne: (...args) => Promise<any>;
  updateOne: (...args) => Promise<any>;
  deleteOne: (...args) => Promise<any>;
};
type ListParams = Parameters<ApiTypes['list']>[0];

type HandleList = (params?: ListParams) => Promise<void>;
type HandleCreate = (form: unknown) => Promise<void>;
type HandleEdit = (id: string, form: unknown) => Promise<void>;
type HandleDelete = (id: string) => Promise<void>;

export type SearchForm = React.FC<{ handleList: HandleList }>;
export type CreateForm = React.FC<{ handleCreate: HandleCreate }>;
export type EditForm = React.FC<{ handleEdit: HandleEdit; data: any }>;

export type ProRestfulProps = PropsWithChildren<
  {
    title?: string;
    columns: ProTableProps['columns'];
    searchForm?: SearchForm;
    createForm?: CreateForm;
    editForm?: EditForm;
  } & ApiTypes
>;
export function ProRestful<T = any>(props: ProRestfulProps) {
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const columns = React.useMemo(
    () => [
      ...props.columns,
      {
        accessorKey: 'actions',
        cell: (props) => {
          return (
            <>
              <IconButton onClick={onEditButtonClicked(props)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDeleteButtonClicked(props)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    [props.columns],
  );
  const [focusedRow, setFocusedRow] = useState<T | null>(null);

  const handleList = useCallback<HandleList>(async (params) => {
    const res = await props.list({
      $page: page + 1,
      $pageSize: rowsPerPage,
      ...params,
    });
    setRows(res.list as T[]);
    setTotal(res.total);
  }, []);
  const handleCreate = useCallback<HandleCreate>(async (data) => {
    await props.createOne(data);
    setIsDrawerOpen(false);
    await handleList();
  }, []);
  const handleDelete = useCallback<HandleDelete>(async (id) => {
    await props.deleteOne(id);
    await handleList();
  }, []);
  const handleEdit = useCallback<HandleEdit>(async (id, data) => {
    await props.updateOne(id, data);
    setIsDrawerOpen(false);
    await handleList();
  }, []);

  const onPageChange = useCallback(
    async function (
      e: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) {
      await handleList({ $page: newPage + 1 });
      setPage(newPage);
    },
    [page, rowsPerPage],
  );
  const onRowsPerPageChange = useCallback(
    async function (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      setRowsPerPage(Number(e.target.value));
      await handleList({ $pageSize: Number(e.target.value) });
    },
    [page, rowsPerPage],
  );
  const onReload = useCallback(() => handleList(), [page, rowsPerPage]);
  const onCreateButtonClicked = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);
  const onEditButtonClicked = useCallback((props: any) => {
    return async () => {
      setFocusedRow(props.row.original);
      setIsDrawerOpen(true);
      await handleList();
    };
  }, []);
  const onDeleteButtonClicked = useCallback((props: any) => {
    return async () => {
      await handleDelete(props.row.original.id);
      await handleList();
    };
  }, []);
  const onDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
    setFocusedRow(null);
  }, []);

  function renderSideForm() {
    if (focusedRow) {
      if (props.editForm) {
        return props.editForm({ handleEdit, data: focusedRow });
      }
    }

    if (props.createForm) {
      return props.createForm({ handleCreate });
    }

    return <></>;
  }

  useEffect(() => {
    handleList();
  }, []);

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Box component={Paper} sx={{ mb: 2 }}>
        <Typography variant="h6">{props.title}</Typography>
        <Stack direction="row" sx={{ padding: 1 }}>
          <Box
            sx={{ flex: 1 }}
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
          >
            {props.searchForm ? props.searchForm({ handleList }) : null}
          </Box>
          <Box>
            <IconButton onClick={onReload}>
              <CachedIcon />
            </IconButton>
            <IconButton onClick={onCreateButtonClicked}>
              <AddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <Box component={Paper} sx={{ mb: 2 }}>
        <ProTable columns={columns} data={rows} />
        <TablePagination
          component={'div'}
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Box>

      <Drawer anchor="right" open={isDrawerOpen} onClose={onDrawerClose}>
        {renderSideForm()}
      </Drawer>
    </Container>
  );
}
