import React, { type Dispatch } from "react";
import { TicketAction, ActionType } from "../reducder/ticketReducer";

export const SearchBar = ({
  dispatch,
}: {
  dispatch: Dispatch<TicketAction>;
}) => {
  return (
    <div>
      <label
        htmlFor="search"
        className="mr-2">
        Search:
      </label>
      <input
        onChange={(e) => {
          dispatch({
            type: ActionType.SearchTitle,
            payload: e.target.value,
          });
        }}
        name="search"
        className="h-[1.5rem] w-36 border border-black/25 pl-2 rounded-sm"
      />
    </div>
  );
};
