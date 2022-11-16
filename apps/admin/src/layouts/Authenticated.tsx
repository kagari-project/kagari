import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Authenticated() {
  return (
    <>
      <ul>
        <li>
          <a href={`/contracts/1`}>contract1</a>
        </li>
        <li>
          <a href={`/contracts/2`}>contract2</a>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </>
  );
}
