import React from 'react';
import { Form } from 'antd';
import { formRender } from '../../components';

let FormRender;
const mockFetch = ({ keyword }) =>
  new Promise(resolve =>
    setTimeout(() => {
      const ran = Math.floor((Math.random() + 0.1) * 10); // 生成一个1~11的随机数
      const no = 80000 + ran * 1111;
      const res = new Array(ran).fill(1).map((data, index) => ({
        id: no + index,
        name: `${keyword}0${index + 1}`
      }));
      resolve(res);
    }, 1000)
  );

const field = {
  key: 'id',
  name: '候选人',
  required: true,
  type: 'origin',
  searchKey: 'keyword',
  format: data => data.map(({ id, name }, index) => ({
    label: `${name}(${id})`,
    value: name,
    key: index
  })),
  service: mockFetch 
};
class LearnTest extends React.Component {
  constructor(props){
    super(props);
    const { form: { getFieldDecorator } } = props;
    FormRender = formRender({ getFieldDecorator });
  }
  render() {
    return (
      <div style={{ width: 300 }}>
        <FormRender field={field} data={{ id: ''}}/>
      </div>

    );
  }
}
export default Form.create()(LearnTest);