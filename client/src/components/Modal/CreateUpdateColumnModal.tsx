import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import React from "react";

interface CreateUpdateColumnModalProps extends ModalProps {
  formProps?: FormProps;
}
export const CreateUpdateColumnModal = ({
  formProps,
  ...props
}: CreateUpdateColumnModalProps) => {
  return (
    <Modal title={"Add list"} destroyOnClose {...props}>
      <Form layout="vertical" {...formProps}>
        <Form.Item name={"title"} label={"Title"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"description"} label={"Description"}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
