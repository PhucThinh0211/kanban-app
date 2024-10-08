import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store/types";

export const getAppState = (state: RootState) => state.app;

export const getColumnsResult = () => {
  return createSelector([getAppState], (state) => state.columnsResult);
};
export const getSelectedTicket = () => {
  return createSelector([getAppState], (state) => state.selectedTicket);
};
