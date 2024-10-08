import { appActions, getColumnsResult } from "@/store/app";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import { Button } from "antd";
import { CreateUpdateColumnModal } from "./Modal/CreateUpdateColumnModal";
import { useForm } from "antd/es/form/Form";

export const Board = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = useForm();

  const columns = useAppSelector(getColumnsResult());

  useEffect(() => {
    dispatch(appActions.getColumnsRequest({}));
  }, []);

  const handleAddColumn = (values: any) => {
    const payload = {
      ...values,
    };
    const callback = (result: any) => {
      if (result) {
        handleCloseCreateColumn();
      }
    };
    dispatch(appActions.createColumnRequest({ body: payload, callback }));
  };

  const handleOpenCreateColumn = () => {
    form.resetFields();
    setModalOpen(true);
  };

  const handleCloseCreateColumn = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <CreateUpdateColumnModal
        open={modalOpen}
        onCancel={handleCloseCreateColumn}
        onOk={form.submit}
        formProps={{ form, onFinish: handleAddColumn }}
      />
      <div className="flex justify-end">
        <Button onClick={handleOpenCreateColumn}>Add list</Button>
      </div>
      <div
        className="overflow-x-auto flex gap-4 no-scrollbar p-4 items-start"
        style={{
          width: "clamp(300px, 100%, 100%)",
        }}
      >
        {columns.map((column) => (
          <Column column={column} key={column._id} />
        ))}
      </div>
    </div>
  );
};
