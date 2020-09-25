export const BasicMigrationProperty = {
  createdAt: {
    name: 'createdAt',
    type: 'datetime',
    isNullable: false,
    default: 'now()',
  },
  updatedAt: {
    name: 'updatedAt',
    type: 'datetime',
    isNullable: false,
    default: 'now()',
  },
};
