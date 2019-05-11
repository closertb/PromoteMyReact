import React from 'react';
import { Popconfirm } from 'antd';
import { EnhanceTable, WithSearch } from 'antd-doddle';
import Search from './SearchBar';
import { searchFields, fields } from './fields';
import withModal from './withModal';
import Edit from './Set';
import Detail from './Detail';

const forkDatas = [{
  id: 1,
  userName: 'Dom',
  userId: 'closertb',
  status: 0
}, {
  id: 2,
  userName: 'Simon',
  userId: 'simona',
  status: 1
}];
export default class ExampleHoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: 'add',
      detail: {},
      child: Edit,
      confirmLoading: false,
    };
    this.handleOperate = this.handleOperate.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  getExtraFields() {
    return [
      {
        key: 'operate',
        name: '操作',
        width: 180,
        fixed: 'right',
        render: (text, detail) => (
          <div>
            <a onClick={() => { this.handleOperate('update', detail); }}>修改</a>
            <a className="ml-10" onClick={() => { this.handleOperate('detail', detail); }}>查看详情</a>
            <Popconfirm title="确认删除？" onConfirm={() => { this.handleOperate('delete', detail); }}>
              <a className="ml-10">删除</a>
            </Popconfirm>
          </div>)
      }
    ];
  }
  handleOk() {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false, visible: false });
    }, 2000);
  }
  handleOperate(type, detail) {
    switch (type) {
    case 'add':
      this.setState({
        type,
        title: '新增用户',
        detail: {},
        visible: Symbol(''),
        child: Edit
      });
      break;
    case 'update':
      this.setState({
        type,
        title: '编辑用户',
        detail,
        visible: Symbol(''),
        child: Edit
      });
      break;
    case 'delete':
      console.log('delete', detail);
      break;
    case 'detail':
      this.setState({
        type,
        title: '用户详情',
        detail,
        visible: Symbol(''),
        child: Detail
      });
      break;
    default:
      break;
    }
  }
  render() {
    const { search, actions = { onSearch: (param) => { console.log('fork', param); } } } = this.props;
    const { title, visible, type, detail, child, confirmLoading } = this.state;
    const forkProps = {
      fields,
      actions,
      datas: forkDatas,
    };
    const searchBarProps = {
      search,
      actions,
      searchFields,
      operate: this.handleOperate
    };
    const modalProps = {
      title,
      visible,
      type,
      detail,
      onOk: this.handleOk,
      confirmLoading,
    };
    const WithModal = withModal(child);
    return (
      <div>
        <WithSearch {...searchBarProps} >
          {props => <Search {...props} searchFields={searchFields} />}
        </WithSearch>
        <EnhanceTable {...forkProps} rowKey="id" extraFields={this.getExtraFields()} />
        <WithModal {...modalProps}/>
      </div>
    );
  }
}
