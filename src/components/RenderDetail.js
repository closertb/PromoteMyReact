import React from 'react';
import { renderBaseFields } from '../utils/common';
import './index.less';

export default class RecordDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { fields, detailInfo = {}, fieldsName } = this.props;
    return (
      <div className="showInfo-model">
        <h3>{fieldsName}</h3>
        <div className="showInfo-content">
          {renderBaseFields(fields, detailInfo)}
        </div>
      </div>
    );
  }
}
