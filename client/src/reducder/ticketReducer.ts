import { TicketData } from "../utils/model";

export enum ActionType {
  SearchTitle = "SEARCH_TITLE",
  SortType = "SORTTYPE",
  SortDirection = "SortDirection",
  FetchTicket = "FetchTicket",
}

type SortingType = "title" | "price";
type SortingDirection = boolean;

interface TicketAction {
  type: ActionType;
  payload: any;
}

export interface TicketState {
  searchTitle: string;
  sorting: { type: SortingType; direction: SortingDirection };
  tickets: TicketData[] | null;
}

export const ticketReducer = (
  prevState: TicketState,
  action: TicketAction
): TicketState => {
  switch (action.type) {
    case ActionType.FetchTicket:
      return {
        ...prevState,
        tickets: action.payload,
      };
    case ActionType.SearchTitle:
      return {
        ...prevState,
        searchTitle: action.payload,
      };
    case ActionType.SortType:
      return {
        ...prevState,
        sorting: {
          ...prevState.sorting,
          type: action.payload,
        },
      };
    case ActionType.SortDirection:
      return {
        ...prevState,
        sorting: {
          ...prevState.sorting,
          direction: action.payload,
        },
      };
    default:
      return prevState;
  }
};
