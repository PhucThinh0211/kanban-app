import { getSelectedTicket } from "@/store/app";
import { useAppSelector } from "@/store/hooks";
import {
  ModalProps,
  FormProps,
  Form,
  Input,
  Modal,
  Row,
  Col,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

interface CreateUpdateTicketModalProps extends ModalProps {
  formProps?: FormProps;
}
export const CreateUpdateTicketModal = ({
  formProps,
  ...props
}: CreateUpdateTicketModalProps) => {
  const selectedTicket = useAppSelector(getSelectedTicket());

  useEffect(() => {
    if (selectedTicket) {
      formProps?.form?.setFieldsValue(selectedTicket);
    } else {
      formProps?.form?.resetFields();
    }
  }, [selectedTicket]);

  return (
    <Modal
      title={selectedTicket ? "Edit ticket" : "Add ticket"}
      destroyOnClose
      {...props}
    >
      <Form layout="vertical" {...formProps}>
        <Form.Item name={"name"} label={"Name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"description"} label={"Description"}>
          <Input.TextArea />
        </Form.Item>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              name={"startDate"}
              label={"Start date"}
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
            >
              <DatePicker format={"DD-MM-YYYY"} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"endDate"}
              label={"End date"}
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
            >
              <DatePicker format={"DD-MM-YYYY"} className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
