import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
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

import { ProTable, ProTableProps } from '../ProTable';
import TablePagination from '@mui/material/TablePagination';
import Drawer from '@mui/material/Drawer';
import Modal from "@mui/material/Modal";

type ApiTypes = {
  list: (...args) => Promise<{ list: unknown[]; total: number }>;
  getOne: (...args) => Promise<unknown>;
  createOne: (...args) => Promise<unknown>;
  updateOne: (...args) => Promise<unknown>;
  deleteOne: (...args) => Promise<unknown>;
};
type ListParams = Parameters<ApiTypes['list']>[0];

type HandleList = (params?: ListParams) => Promise<void>;
type HandleCreate = (form: unknown, original?: unknown) => Promise<void>;
type HandleEdit = (id: string, form: unknown) => Promise<void>;
type HandleDelete = (row: { id: string; [key: string]: unknown }) => Promise<void>;

export type SearchForm = React.FC<{ handleList: HandleList }>;
export type CreateForm = React.FC<{ handleCreate: HandleCreate }>;
export type EditForm = React.FC<{ handleEdit: HandleEdit; data: unknown }>;

export type ProRestfulProps = PropsWithChildren<
  {
    title?: string;
    mode?: "drawer" | "modal" | "standalone-page"
    columns: ProTableProps['columns'];
    searchForm?: SearchForm;
    createForm?: CreateForm;
    editForm?: EditForm;
  } & ApiTypes
>;

export type ExposedProRestful<T = unknown> = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setFocusedRow: React.Dispatch<React.SetStateAction<T>>,
  handleList: HandleList,
  handleCreate: HandleCreate,
  handleEdit: HandleEdit,
  handleDelete: HandleDelete,
  focusedRow: T,
}

export const ProRestful = React.forwardRef(function <T = unknown>(
  props: ProRestfulProps,
  ref,
) {
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const columns = React.useMemo(() => [...props.columns], [props.columns]);
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
  const handleDelete = useCallback<HandleDelete>(async (row) => {
    await props.deleteOne(row);
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

  function renderForms() {
    if (props.mode === 'modal') {
      return <Modal open={isDrawerOpen} onClose={onDrawerClose}>{renderSideForm()}</Modal>
    }
    return <Drawer anchor="right" open={isDrawerOpen} onClose={onDrawerClose}>{renderSideForm()}</Drawer>
  }

  useImperativeHandle<unknown, ExposedProRestful>(
    ref,
    () => ({
      setIsDrawerOpen,
      setFocusedRow,
      handleList,
      handleCreate,
      handleEdit,
      handleDelete,
      focusedRow,
    }),
    [focusedRow],
  );

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

      {
        renderForms()
      }
      {props.children}
    </Container>
  );
});
