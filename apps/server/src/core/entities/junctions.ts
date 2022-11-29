import { JoinTableOptions } from '@kagari/database';

export const M2M_USERS__ROLES: JoinTableOptions = {
  name: 'm2m_users__roles',
  joinColumn: {
    name: 'userId',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'roleId',
    referencedColumnName: 'id',
  },
};
export const M2M_USERS__PERMISSIONS: JoinTableOptions = {
  name: 'm2m_users__permissions',
  joinColumn: {
    name: 'userId',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'permissionId',
    referencedColumnName: 'id',
  },
};
export const M2M_ROLES__PERMISSIONS: JoinTableOptions = {
  name: 'm2m_roles__permissions',
  joinColumn: {
    name: 'roleId',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'permissionId',
    referencedColumnName: 'id',
  },
};
