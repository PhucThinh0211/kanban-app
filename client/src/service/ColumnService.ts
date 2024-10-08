import { Observable } from "rxjs";
import HttpClient from "./HttpClient";
import { buildRequestOptions } from "./HttpHelper";
import { RequestOptions } from "./types";

const apiUrl = "http://localhost:5000/api";

export interface TicketResponse {
  _id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnResponse {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  tickets: TicketResponse[];
}

export interface CreateUpdateColumnPayload {
  title: string;
  description?: string;
}

export interface CreateUpdateTicketPayload {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

class ColumnController {
  public Get = {
    getColumnList: (options?: RequestOptions): Observable<ColumnResponse[]> => {
      return HttpClient.get(`${apiUrl}/columns`, options);
    },
  };

  public Post = {
    createColumn: (
      input: CreateUpdateColumnPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/columns`, input, options);
    },
    addTicket: (
      columnId: string,
      ticket?: CreateUpdateTicketPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/columns/${columnId}/ticket`,
        ticket,
        options
      );
    },
  };

  public Put = {
    updateTicket: (
      columnId: string,
      ticketId: string,
      body: CreateUpdateTicketPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/columns/${columnId}/ticket/${ticketId}`,
        body,
        options
      );
    },
    moveTicket: (
      oldColumnId: string,
      newColumnId: string,
      ticketId: string,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/columns/${oldColumnId}/moveTicket`,
        {
          columnId: newColumnId,
          ticketId,
        },
        options
      );
    },
  };

  public Delete = {
    deleteColumn: (id: string, options?: RequestOptions) => {
      return HttpClient.delete(`${apiUrl}/columns/${id}`, options);
    },
    deleteTicket: (
      columnId: string,
      ticketId: string,
      options?: RequestOptions
    ) => {
      return HttpClient.delete(
        `${apiUrl}/columns/${columnId}/ticket/${ticketId}`,
        options
      );
    },
  };
}

export const ColumnService = new ColumnController();
