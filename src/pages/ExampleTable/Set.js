import React from 'react';
import { Spin } from 'antd';
import { editFields } from './fields';
import { formRender } from 'antd-doddle';

let FormRender;
export default class Set extends React.Component {
  constructor(props) {
    super(props);
    const { form: { getFieldDecorator } } = props;
    this.state = {};
    FormRender = formRender({ getFieldDecorator });
    console.log('create');
  }
  componentWillReceiveProps() {
    console.log('update');
  }
  render() {
    const { detail: data, confirmLoading } = this.props;
    return (
      <Spin spinning={confirmLoading}>
        {editFields.map((field, key) => <FormRender key={key} {...{ field, data }} />)}
      </Spin>
    );
  }
}