import React from 'react';
import { Table } from 'antd';

export default class EnhanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getInitalColumns(fields) {
    const { extraFields = [] } = this.props;
    return fields.concat(extraFields).map(e => {
      e.title = e.name;
      e.dataIndex = e.key;
      return e;
    });
  }
  render() {
    const { fields, search = {}, datas, total = 0, loading = {}, actions = {},
      rowKey = 'id', scrollProp = {}, noPage = false } = this.props;
    const columns = this.getInitalColumns(fields);
    const pagination = noPage ? false : {
      total,
      current: search.pageNum,
      pageSize: search.pageCount || search.pageSize,
      onChange: page => actions.onSearch({ pageNum: page }),
      showTotal: t => `共 ${t} 条`
    };
    const tableProps = {
      columns,
      pagination,
      bordered: true,
      dataSource: datas,
      loading: loading.list,
      rowKey,
      scroll: scrollProp
    };

    return (
      <div style={{ marginTop: 10 }} >
        <Table {...tableProps} />
      </div>
    );
  }
}

