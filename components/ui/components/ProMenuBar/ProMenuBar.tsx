import React, { PropsWithChildren, useCallback, useState } from 'react';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
  To,
} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { SxProps } from '@mui/system/styleFunctionSx';

export const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function (itemProps, ref) {
    const { palette } = useTheme();
    return (
      <RouterLink
        ref={ref}
        {...itemProps}
        style={({ isActive }) => ({
          color: isActive ? palette.common.white : palette.common.black,
          backgroundColor: isActive ? palette.secondary.light : 'inherit',
        })}
        role={undefined}
      />
    );
  },
);

export interface ListItemLinkProps {
  node: MenuItem;
}
export function ListItemLink(props: ListItemLinkProps) {
  const { node } = props;

  return (
    <ListItem component={Link} to={node.to}>
      {node.icon ? <ListItemIcon>{node.icon}</ListItemIcon> : <></>}
      <ListItemText primary={node.text} />
    </ListItem>
  );
}

export interface BaseMenuItem {
  text: string;
  icon?: JSX.Element;
}
export interface MenuItem extends BaseMenuItem {
  to: To;
}
export interface NestedMenuItem extends BaseMenuItem {
  children: Array<MenuItem | NestedMenuItem>;
}
export type MenuConfig = Array<MenuItem | NestedMenuItem>;

export function ListItemGroup(
  props: PropsWithChildren<{ node: NestedMenuItem; sx?: SxProps }>,
) {
  const { node } = props;
  const [open, setOpen] = useState(false);
  const toggleCollapse = useCallback(() => setOpen(!open), [open]);
  return (
    <Box>
      <ListItemButton onClick={toggleCollapse}>
        {node.icon ? <ListItemIcon>{node.icon}</ListItemIcon> : <></>}
        <ListItemText primary={node.text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {node.children.map((subNode, i) =>
          Array.isArray((subNode as NestedMenuItem).children) ? (
            <ListItemGroup key={i} node={subNode as NestedMenuItem} />
          ) : (
            <ListItemLink key={i} node={subNode as MenuItem} />
          ),
        )}
      </Collapse>
    </Box>
  );
}

export function ProMenuBar(
  props: PropsWithChildren<{
    menu: MenuConfig;
    opened: boolean;
    sx?: SxProps;
  }>,
) {
  return (
    <List
      component="nav"
      sx={{ display: props.opened ? 'auto' : 'none', ...props.sx }}
    >
      {props.menu.map((node, i) =>
        Array.isArray((node as NestedMenuItem).children) ? (
          <ListItemGroup key={i} node={node as NestedMenuItem} />
        ) : (
          <ListItemLink key={i} node={node as MenuItem} />
        ),
      )}
    </List>
  );
}
