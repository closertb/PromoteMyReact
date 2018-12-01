import React from 'react';
import { Form, Modal } from 'antd';

Function.prototype.getName = function () {
  return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};
let oldChild;
let HComponent;
export default function withModal(Component){
  class HModal extends React.Component {
    constructor(props) {
      super(props);
      const { visible } = props;
      this.state = {
        visible: Boolean(visible),
        destory: true, // Modal关闭后会完全销毁所有的DOM
      };
      this.handleCancel = this.handleCancel.bind(this);
      this.handleOk = this.handleOk.bind(this);
    }
    // eslint-disable-next-line
    componentWillReceiveProps({ visible, confirmLoading }) {
      // 若 visible 为 false，表示主动关闭弹框
      if (visible === false) {
        return this.setState({ visible });
      }

      // 如果props中的visible属性改变，则显示modal
      if (visible && (visible !== this.props.visible)) {
        this.setState({
          visible: true
        });
      }
      // 如果confirmLoading 从true转变为flase,则处理关闭逻辑
      if (confirmLoading !== undefined && confirmLoading === false && this.props.confirmLoading) {
        this.setState({
          visible: false
        });
      }
    }

    handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
      this.setState({
        visible: false
      });
    }

    handleOk() {
      const { confirmLoading, form, onOk } = this.props;
      const hideModal = () => {
        // 如果没有设置confirmLoading,则直接关闭窗口
        if (confirmLoading === undefined) {
          this.handleCancel();
        }
      };

      if (onOk && form) {
        // 如果设置了form属性，则验证成功后才关闭表单
        form.validateFields((error, values) => {
          if (error) return;
          const res = onOk(values);
          res && hideModal();
        });
      } else {
        onOk && onOk();
        hideModal();
      }
    }

    render() {
      const { confirmLoading, visible, title = '弹窗', form, ...others } = this.props;
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
  // HComponent = !HComponent || Component.getName() !== oldChild.getName() ? Form.create()(HModal) : HComponent;
  // oldChild = Component;
  return Form.create()(HModal);
}

