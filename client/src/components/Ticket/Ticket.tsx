import React, { useMemo, useState } from "react";

import { Button, Dropdown, Select, Spin, Typography } from "antd";
import { DashOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { ColumnResponse, TicketResponse } from "@/service/ColumnService";
import { appActions, getColumnsResult } from "@/store/app";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useForm } from "antd/es/form/Form";
import { CreateUpdateTicketModal } from "../Modal/CreateUpdateTicketModal";

interface TicketProps {
  ticket: TicketResponse;
  ticketColumn: ColumnResponse;
}
export const Ticket = ({ ticket, ticketColumn }: TicketProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const [open, setOpen] = useState(false);

  const columns = useAppSelector(getColumnsResult());

  const columnOptions = useMemo(
    () =>
      columns
        .filter((column) => column._id !== ticketColumn._id)
        .map((column) => ({
          label: column.title,
          value: column._id,
        })),
    [ticketColumn, columns]
  );

  const getMoreActions = (record: TicketResponse) => {
    return [
      {
        key: "move",
        label: "Move to",
        children: columnOptions.map((option) => ({
          key: option.value,
          label: option.label,
          onClick: () => handleMoveTicket(option.value),
        })),
      },
      {
        key: "edit",
        label: "Edit",
        icon: <EditOutlined />,
        onClick: () => handleEditTicket(record),
      },
      {
        key: "remove",
        label: "Remove",
        icon: <DeleteOutlined style={{ color: "#ff4d4f" }} />,
        onClick: () => handleRemoveTicket(record),
      },
    ];
  };

  const handleOpenCreateTicketModal = () => {
    form.resetFields();
    setOpen(true);
  };

  const handleCloseCreateTicketModal = () => {
    setOpen(false);
    dispatch(appActions.setSelectedTicket(undefined));
  };

  const handleEditTicket = (record: TicketResponse) => {
    dispatch(appActions.setSelectedTicket(record));
    handleOpenCreateTicketModal();
  };

  const handleSaveTicket = (values: any) => {
    const body = values;
    const callback = (result: any) => {
      if (result) {
        handleCloseCreateTicketModal();
      }
    };
    dispatch(
      appActions.updateTicketRequest({
        columnId: ticketColumn._id,
        ticketId: ticket._id,
        body,
        callback,
      })
    );
  };

  const handleRemoveTicket = (record: TicketResponse) => {
    setIsSaving(true);
    const callback = (success?: boolean) => {
      setIsSaving(false);
    };
    dispatch(
      appActions.deleteTicketRequest({
        columnId: ticketColumn._id,
        ticketId: record._id,
        callback,
      })
    );
  };

  const handleMoveTicket = (columnId: string) => {
    const oldColumnId = ticketColumn._id;
    const ticketId = ticket._id;
    const callback = (success: boolean) => {
      if (success) {
        setIsSaving(false);
      }
    };
    dispatch(
      appActions.moveTicketRequest({
        oldColumnId,
        newColumnId: columnId,
        ticketId,
        callback,
      })
    );
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow p-2">
      <CreateUpdateTicketModal
        open={open}
        onCancel={handleCloseCreateTicketModal}
        onOk={form.submit}
        formProps={{ form, onFinish: handleSaveTicket }}
      />
      <Spin spinning={isSaving}>
        <div className="flex justify-between items-center">
          <div>
            <Typography.Text>{ticket.name}</Typography.Text>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Dropdown menu={{ items: getMoreActions(ticket) }}>
              <Button
                shape="circle"
                icon={<DashOutlined />}
                size="small"
                type="text"
              />
            </Dropdown>
          </div>
        </div>
      </Spin>
    </div>
  );
};
