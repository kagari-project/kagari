import React, { PropsWithChildren, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  TableOptions,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Stack, TableContainer } from '@mui/material';
import { Optional } from 'utility-types';

export * from '@tanstack/react-table';

export function TableColumnFilterMenu(props: {
  table: ReturnType<typeof useReactTable<any>>;
}) {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const handleOpen = useCallback((ev: React.MouseEvent<HTMLElement>) => {
    setAnchor(ev.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <FilterListIcon />
      </IconButton>
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <Checkbox
            indeterminate={
              props.table.getAllLeafColumns().length >
                props.table.getVisibleLeafColumns().length &&
              props.table.getVisibleLeafColumns().length !== 0
            }
            checked={props.table.getIsAllColumnsVisible()}
            onChange={props.table.getToggleAllColumnsVisibilityHandler()}
          />
          <InputLabel>All</InputLabel>
        </MenuItem>
        {props.table.getAllLeafColumns().map((column) => (
          <MenuItem key={column.id}>
            <Checkbox
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            <InputLabel>{column.id}</InputLabel>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export type ProTableProps<T = any> = Optional<
  TableOptions<T>,
  'getCoreRowModel' | 'getSortedRowModel'
>;
export function ProTable<T = any>({
  columns,
  data,
  ...rest
}: PropsWithChildren<ProTableProps<T>>) {
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const $table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...rest,
    columns,
    data,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <TableContainer>
      <Stack
        justifyContent="start"
        direction="row"
        sx={{ position: 'relative', width: '100%' }}
      >
        <TableColumnFilterMenu table={$table} />
      </Stack>
      <Table>
        <TableHead>
          {$table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{ width: '1px', whiteSpace: 'nowrap' }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{ asc: ' 🔼', desc: ' 🔽' }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {$table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{ width: '1px', whiteSpace: 'nowrap' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
