import React from 'react';
import { Spin } from 'antd';
import { RenderDetail } from '../../components';

import { fields } from './fields';
export default function Detail(props) {
  const { confirmLoading, detail } = props;
  return (
    <Spin spinning={confirmLoading}>
      <RenderDetail fields={fields} detailInfo={detail} fieldsName="用户信息" />
    </Spin>
  );

}