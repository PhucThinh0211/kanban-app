import {
  catchError,
  concat,
  filter,
  finalize,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from "rxjs";

import { appActions } from "./appSlice";
import { RootEpic } from "../types";
import { ColumnService } from "@/service/ColumnService";

const getColumnsRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.getColumnsRequest.match),
    switchMap((action) => {
      const { callback } = action.payload;
      let hasData: boolean;
      return concat(
        ColumnService.Get.getColumnList().pipe(
          switchMap((columns) => {
            hasData = Boolean(columns.length);
            return [appActions.setColumnsResult(columns || [])];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(hasData);
            }
          })
        )
      );
    })
  );
};

const createColumnRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.createColumnRequest.match),
    switchMap((action) => {
      const { callback, body } = action.payload;
      let result: any;
      return concat(
        ColumnService.Post.createColumn(body).pipe(
          switchMap((createdColumn) => {
            result = createdColumn;
            return [appActions.getColumnsRequest({})];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(result);
            }
          })
        )
      );
    })
  );
};

const deleteColumnRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.deleteColumnRequest.match),
    switchMap((action) => {
      const { callback, columnId } = action.payload;
      let success: boolean;
      return concat(
        ColumnService.Delete.deleteColumn(columnId).pipe(
          switchMap((res) => {
            success = Boolean(res);
            return [appActions.getColumnsRequest({})];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(success);
            }
          })
        )
      );
    })
  );
};

const addTicketRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.addTicketRequest.match),
    switchMap((action) => {
      const { callback, columnId, body } = action.payload;
      let result: any;
      return concat(
        ColumnService.Post.addTicket(columnId, body).pipe(
          switchMap((updatedColumn) => {
            result = updatedColumn;
            return [appActions.getColumnsRequest({})];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(result);
            }
          })
        )
      );
    })
  );
};

const updateTicketRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.updateTicketRequest.match),
    switchMap((action) => {
      const { callback, columnId, ticketId, body } = action.payload;
      let result: any;
      return concat(
        ColumnService.Put.updateTicket(columnId, ticketId, body).pipe(
          switchMap((updatedColumn) => {
            result = updatedColumn;
            return [appActions.getColumnsRequest({})];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(result);
            }
          })
        )
      );
    })
  );
};

const deleteTicketRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.deleteTicketRequest.match),
    switchMap((action) => {
      const { callback, columnId, ticketId } = action.payload;
      let success: boolean;
      return concat(
        ColumnService.Delete.deleteTicket(columnId, ticketId).pipe(
          switchMap((updatedColumn) => {
            success = Boolean(updatedColumn);
            return [appActions.getColumnsRequest({})];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(success);
            }
          })
        )
      );
    })
  );
};

const moveTicketRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.moveTicketRequest.match),
    switchMap((action) => {
      const { callback, oldColumnId, newColumnId, ticketId } = action.payload;
      let success: boolean;
      return concat(
        ColumnService.Put.moveTicket(oldColumnId, newColumnId, ticketId).pipe(
          switchMap((updatedColumn) => {
            success = Boolean(updatedColumn);
            return [appActions.getColumnsRequest({})];
          }),
          catchError((error) => {
            return [];
          }),
          finalize(() => {
            if (callback) {
              callback(success);
            }
          })
        )
      );
    })
  );
};

export const appEpics = [
  getColumnsRequest$,
  createColumnRequest$,
  deleteColumnRequest$,
  addTicketRequest$,
  updateTicketRequest$,
  deleteTicketRequest$,
  moveTicketRequest$,
];
