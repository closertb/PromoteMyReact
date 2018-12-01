import React from 'react';
import { Form, Input, Select } from 'antd';
import { formItemLayout as layout } from '../configs/constants';
import OriginSearch from './OriginSearch';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

export default function (params) {
  const { formItemLayout = layout, getFieldDecorator } = params;
  return function FormRender(props) {
    const { field, data = {} } = props;
    const {
      type = 'input',
      key,
      name,
      required = false,
      allowClear = true,
      placeholder,
      disable = false,
      rules = [],
    } = field;
    let content = null;
    switch (type) {
    case 'input':
    // eslint-disable-next-line
      const patternRules = [{ required, message: placeholder || `请输入${name}` },
        { pattern: /^\S.*\S$|^\S$/, message: '首尾不能含有空字符' }].concat(rules);
      content = (
        <FormItem key={key} label={name} {...formItemLayout} className="self-define-item">
          {getFieldDecorator(key, {
            initialValue: data[key],
            rules: patternRules
          })(
            <Input type="text" placeholder={placeholder || `请输入${name}`} disabled={disable && disable(data)} />
          )}
        </FormItem>
      );
      break;
    case 'text':
      content = (
        <FormItem key={key} label={name} {...formItemLayout} className="self-define-item">
          {getFieldDecorator(key, {
            initialValue: data[key],
            rules: [{ required, message: placeholder || `请输入${name}` }]
          })(
            <TextArea type="text" placeholder={placeholder || `请输入${name}`} autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
      );
      break;
    case 'origin':
    /* eslint-disable-next-line */
      const { service, format, searchKey, onSelect } = field;
      content = (
        <FormItem key={key} label={name} {...formItemLayout} className="self-define-item">
          {getFieldDecorator(key, {
            initialValue: data[key],
            rules: [{ required, message: placeholder || `请输入${name}` }]
          })(
            <OriginSearch
              disabled={disable && disable(data)}
              style={{ width: '100%', height: 32 }}
              searchKey={searchKey}
              onSelect={onSelect}
              format={format}
              fetchData={service}
            />
          )}
        </FormItem>
      );
      break;
    case 'select':
    // eslint-disable-next-line
      const { related, relatedKey, enums = [], onSelect: onChange = () => {}, defaultValue } = field;
      content = (!related || typeof data[relatedKey] !== 'undefined') && (
        <FormItem key={key} label={name} {...formItemLayout}>
          {getFieldDecorator(key, {
            initialValue: data[key] || defaultValue,
            rules: [{ required, message: placeholder || `请输入${name}` }]
          })(
            <Select
              style={{ width: '100%' }}
              placeholder={placeholder || '不限'}
              allowClear={allowClear}
              disabled={disable && disable(data)}
              onSelect={onChange}
            >
              {(props.enums || enums).map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
              ))}
            </Select>
          )}
        </FormItem>
      );
      break;
    case 'datePicker':
    case 'render':
      content = field.rander(getFieldDecorator, data);
      break;
    default:
      break;
    }
    return content;
  };
}
