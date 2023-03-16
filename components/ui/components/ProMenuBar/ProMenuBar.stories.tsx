import React from 'react';
import { ProMenuBar } from './ProMenuBar';
import Box from '@mui/material/Box';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'ProMenuBar',
  component: ProMenuBar,
};

export function Default() {
  return (
    <Router>
        <ProMenuBar
            sx={{ width: 200 }}
          opened={true}
          menu={[
            {
              text: 'item0',
              children: [{ text: 'item0-0', to: '/' }],
            },
          ]}
        />
    </Router>
  );
}

export function RealExample() {
    const tree = [
        {
            text: '首页',
            to: '/',
        },
        {
            text: '用户与权限',
            children: [
                {
                    text: '用户管理',
                    to: '/Users',
                },
                {
                    text: '角色管理',
                    to: '/Roles',
                },
                {
                    text: '权限管理',
                    to: '/Permissions',
                },
            ],
        },
        {
            text: '内容管理',
            children: [
                {
                    text: '公告',
                    to: '/Announcements',
                },
                {
                    text: '文章',
                    to: '/Articles',
                },
            ],
        },
        {
            text: '资源库',
            to: '/Gallery',
        },
    ]
    return (
        <Router>
                <ProMenuBar
                    sx={{ width: 200 }}
                    opened={true}
                    menu={tree}
                />
        </Router>
    );
}
