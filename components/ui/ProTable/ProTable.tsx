import React, { PropsWithChildren } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

export type ColumnDef = {
  label?: string;
  prop?: 'actions' | string;
  align?: TableCellProps['align'];
  buttons?: JSX.Element;
  format?: (row: RowDef) => any;
};
export type RowDef = Record<string, any>;

export type ProTableProps = {
  columns: ColumnDef[];
  rows: RowDef[];
};

export default function ProTable(props: PropsWithChildren<ProTableProps>) {
  const { columns = [], rows = [] } = props;

  return (
    <TableContainer>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell
                key={column.prop ?? i}
                align={column.align ?? 'center'}
              >
                {column.label ?? column.prop}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id ?? i}>
              {columns.map((columns) =>
                columns.buttons ? (
                  <TableCell align={columns.align ?? 'center'}>
                    {columns.buttons}
                  </TableCell>
                ) : (
                  <TableCell align={columns.align ?? 'center'}>
                    {columns.format ? columns.format(row) : row[columns.prop]}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
