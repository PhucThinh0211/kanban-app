import React, { useState } from "react";

import { Button, Divider, Dropdown, Typography } from "antd";
import { DashOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { ColumnResponse } from "@/service/ColumnService";
import { useAppDispatch } from "@/store/hooks";
import { appActions } from "@/store/app";
import { Ticket } from "../Ticket";
import { useForm } from "antd/es/form/Form";
import { CreateUpdateTicketModal } from "../Modal/CreateUpdateTicketModal";

interface ColumnProps {
  column: ColumnResponse;
}
export const Column = ({ column }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [form] = useForm();
  const [open, setOpen] = useState(false);

  const handleRemoveColumn = (record: ColumnResponse) => {
    setIsDeleting(true);
    const callback = (success?: boolean) => {
      setIsDeleting(false);
    };
    dispatch(
      appActions.deleteColumnRequest({ columnId: record._id, callback })
    );
  };

  const getMoreActions = (record: ColumnResponse) => {
    return [
      {
        key: "remove",
        label: "Remove",
        icon: <DeleteOutlined style={{ color: "#ff4d4f" }} />,
        onClick: () => handleRemoveColumn(record),
      },
    ];
  };

  const handleAddTicket = (values: any) => {
    const body = values;
    const callback = (res: any) => {
      if (res) {
        handleCloseCreateTicketModal();
      }
    };

    dispatch(
      appActions.addTicketRequest({ columnId: column._id, body, callback })
    );
  };

  const handleOpenCreateTicketModal = () => {
    form.resetFields();
    setOpen(true);
  };

  const handleCloseCreateTicketModal = () => {
    setOpen(false);
  };

  return (
    <div className=" max-w-sm rounded-lg overflow-hidden shadow-lg min-w-[250px] bg-white flex flex-col">
      <CreateUpdateTicketModal
        open={open}
        onCancel={handleCloseCreateTicketModal}
        onOk={form.submit}
        formProps={{ form, onFinish: handleAddTicket }}
      />
      <div className="flex flex-row justify-between gap-2 items-center p-2">
        <Typography.Text
          strong
          className=" whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {column.title}
        </Typography.Text>
        <Dropdown menu={{ items: getMoreActions(column) }}>
          <Button
            shape="circle"
            icon={<DashOutlined />}
            loading={isDeleting}
            size="small"
            type="text"
          />
        </Dropdown>
      </div>
      <div className="flex flex-col gap-2 mt-2 px-2">
        {column.tickets.map((ticket) => (
          <Ticket ticket={ticket} ticketColumn={column} key={ticket._id} />
        ))}
      </div>
      <Divider className="my-2" />
      <div className="flex justify-start pr-2 pb-1">
        <Button
          icon={<PlusOutlined />}
          type="text"
          onClick={handleOpenCreateTicketModal}
        >
          Add ticket
        </Button>
      </div>
    </div>
  );
};
