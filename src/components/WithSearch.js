import React from 'react';
import { Form } from 'antd';
import formRender from './FormRender';

class WithSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { form: { getFieldDecorator } } = props;
    this.formRender = formRender({ getFieldDecorator });
    this.handleSearch = this.handleSearch.bind(this);
  }
  /*   componentWillReceiveProps(nextProps) {
    const { form, search } = this.props;

    if ('search' in nextProps && nextProps.search !== search) {
      form.resetFields();
    }
  } */

  handleSearch(paramFormat) {
    const { form, actions } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      const res = typeof paramFormat === 'function' ? paramFormat(values) : values;
      actions.onSearch({
        ...res,
        pageNum: 1
      });
    });
  }

  render() {
    const { search, children, ...others } = this.props;
    const childrenProps = {
      ...others,
      formRender: this.formRender,
      onSearch: this.handleSearch,
      search,
    };
    return (
      <div className="search-form">
        {children(childrenProps)}
      </div>
    );
  }
}

export default Form.create()(WithSearch);
