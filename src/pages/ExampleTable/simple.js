import React from 'react';
import { Form, Modal } from 'antd';

Function.prototype.getName = function () {
  return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};
let oldChild;
let HComponent;
/**
 * description: 
 * 在Modal基础上新增加Form属性
 * 增加了子组件是否更新的判断，避免组件不必要的销毁
 * 给组件配上默认的onOk与onCancel方法
 * @param {*} Component 
 */
export default function withModal(Component){
  class HModal extends React.Component {
    constructor(props) {
      super(props);
      const { visible } = props;
      this.state = {
        visible: Boolean(visible)
      };
      this.handleCancel = this.handleCancel.bind(this);
      this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
      const { confirmLoading, form, onOk } = this.props;
      const hideModal = () => {
        // 如果没有设置confirmLoading,则直接关闭窗口
        if (confirmLoading === undefined) {
          this.handleCancel();
        }
      };

      if (onOk) {
        // 表单验证成功后才关闭表单
        form.validateFields((error, values) => {
          if (error) return;
          const res = onOk(values);
          res && hideModal();
        });
      }
    }

    render() {
      const { confirmLoading, visible, title = '弹窗容器', form, ...others } = this.props;
      const modalProps = {
        title,
        confirmLoading,
        visible: this.state.visible,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
      };
      const childProps = {
        form,
        visible,
        confirmLoading,
        ...others,
      };
      
      return (
        <Modal {...modalProps}>
          <Component {...childProps} />
        </Modal>
      );
    }
  }
  // 如果原始组件类型没有改变，则返回上一次生成的组件，否则生成一个新组件
  HComponent = !HComponent || Component.getName() !== oldChild.getName() ? Form.create()(HModal) : HComponent;
  oldChild = Component;
  return HComponent;
}

