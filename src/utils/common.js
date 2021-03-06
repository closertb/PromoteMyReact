import React from 'react';
import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../configs/constants';
/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */
export const getEnumObject = (enums, value, key = 'value') => {
  const res = enums.filter(item => item[key] === value);
  return res.length > 0 ? res[0] : {};
};

/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: props  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */
export function renderBaseFields(fields, props = {}) {
  return fields.map(({ name, key, type, enums, render }, index) => {
    let value = props[key];

    if (type === 'date') {
      value = value && moment(value).format(DATE_FORMAT);
    }
    if (type === 'datetime') {
      value = value && moment(value).format(DATE_TIME_FORMAT);
      !value && (value = '-:-:-');
    }
    // 处理枚举
    if (enums && enums.length > 0) {
      value = getEnumObject(enums, props[key]).label;
    }
    // 处理render 函数
    if (render && typeof render === 'function') {
      value = render(props);
    }
    // 处理没有值时，统一显示为--,
    (value === undefined || value === '') && (value = '--');
    return (<div className="showInfo-item" key={index} >
      <span className="showInfo-label">{name}</span>
      <span className="showInfo-value">{value}</span>
    </div>);
  });
}