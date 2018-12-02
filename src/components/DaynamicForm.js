import React from 'react';
import { Button } from 'antd';


export default class DaynamicForm extends React.Component {
  constructor(props) {
    super(props);
    const { value = [{ key: 0 }] } = props;
    this.state = {
      rules: value.map((ele, key) => ({ ...ele, key })),
    };
    this.handlMinus = this.handlMinus.bind(this);
    this.handlAdd = this.handlAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handlMinus(index) {
    const { rules } = this.state;
    rules[index].deleteFlag = true;
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  handlAdd() {
    let { rules } = this.state;
    rules = rules.concat([{ value: undefined, key: rules.length }]);
    this.setState({ rules: [...rules] });
    this.trigger(rules);
  }
  handleChange(val, index, key) {
    const { rules } = this.state;
    rules[index][key] = val;
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  trigger(res) {
    const { onChange } = this.props;
    onChange && onChange(res.filter(e => !e.deleteFlag));
  }
  render() {
    const { children } = this.props;
    const { rules } = this.state;
    const actions = {
      handlAdd: this.handlAdd,
      handlMinus: this.handlMinus,
      handleChange: this.handleChange,
    };
    return (
      <div>
        {rules.filter(rule => !rule.deleteFlag).map(rule => (
          <div key={rule.key}>
            {children(rule, actions)}
            {rule.key === 0 ?
              <Button
                style={{ marginLeft: 10 }}
                onClick={this.handlAdd}
                type="primary"
                shape="circle"
                icon="plus"
              /> :
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                shape="circle"
                icon="minus"
                onClick={() => this.handlMinus(rule.key)}
              />
            }
          </div>)
        )}
      </div>
    );
  }
}
