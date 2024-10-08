import {
  ColumnResponse,
  CreateUpdateColumnPayload,
  CreateUpdateTicketPayload,
  TicketResponse,
} from "@/service/ColumnService";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  columnsResult: ColumnResponse[];
  selectedTicket?: TicketResponse;
}

const initialState: AppState = {
  columnsResult: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getColumnsRequest: (state, action) => {},
    setColumnsResult: (state, action) => {
      state.columnsResult = action.payload;
    },

    createColumnRequest: (
      state,
      action: PayloadAction<{
        body: CreateUpdateColumnPayload;
        callback?: Function;
      }>
    ) => {},
    deleteColumnRequest: (
      state,
      action: PayloadAction<{ columnId: string; callback?: Function }>
    ) => {},
    addTicketRequest: (
      state,
      action: PayloadAction<{
        columnId: string;
        body: CreateUpdateTicketPayload;
        callback?: Function;
      }>
    ) => {},
    updateTicketRequest: (
      state,
      action: PayloadAction<{
        columnId: string;
        ticketId: string;
        body: CreateUpdateTicketPayload;
        callback?: Function;
      }>
    ) => {},
    deleteTicketRequest: (
      state,
      action: PayloadAction<{
        columnId: string;
        ticketId: string;
        callback?: Function;
      }>
    ) => {},
    moveTicketRequest: (
      state,
      action: PayloadAction<{
        oldColumnId: string;
        newColumnId: string;
        ticketId: string;
        callback?: Function;
      }>
    ) => {},

    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
