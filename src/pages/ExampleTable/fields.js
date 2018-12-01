import { userStatus } from '../../configs/constants';

export const fields = [{
  key: 'userName',
  name: '真实姓名',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'status',
  name: '状态',
  enums: userStatus
}];

export const searchFields = [{
  key: 'userId',
  name: '用户ID',
}];

export const editFields = [{
  key: 'userName',
  name: '真实姓名',
  required: true,
  disable: data => typeof data.userName !== 'undefined'
}, {
  key: 'mail',
  name: '邮箱',
  required: true
}, {
  key: 'userId',
  name: '用户ID',
  required: true
}, {
  key: 'status',
  name: '状态',
  required: true,
  type: 'select',
  enums: userStatus
}, {
  key: 'remark',
  name: '备注',
}];