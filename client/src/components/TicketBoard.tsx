import { TicketBoardProps, TicketData } from "../utils/model";
import { Button } from "./Button";
import { handleButton } from "../utils/handleButton";
import { Card } from "./Card";
import { useEffect, useReducer } from "react";
import { TicketState } from "../reducder/ticketReducer";
import { ticketReducer } from "../reducder/ticketReducer";
import { ActionType } from "../reducder/ticketReducer";
import { SortDown, SortUp } from "react-bootstrap-icons";
import { sortTickets } from "../utils/sortTicket";

const initialState: TicketState = {
  searchTitle: "",
  sorting: { type: "title", direction: true },
  tickets: null,
};

export const TicketBoard = ({ props }: { props: TicketBoardProps }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const { data, loading, error, fetchdata } = props;

  const seachedTickets = (data: TicketData[]) => {
    return data.filter((ticket) => {
      if (state.searchTitle === "") {
        return data;
      } else {
        return ticket.title
          .toLowerCase()
          .includes(state.searchTitle.toLowerCase());
      }
    });
  };
  useEffect(() => {
    if (data) {
      const tickets = seachedTickets(data);
      const sortedTickets = sortTickets(
        tickets,
        state.sorting.type,
        state.sorting.direction
      );
      console.log(sortedTickets);
      dispatch({
        type: ActionType.FetchTicket,
        payload: sortedTickets,
      });
    }
  }, [state.searchTitle, state.sorting, data]);

  return (
    <div className="min-w-[450px] w-full p-2 border border-black/25 bg-white rounded-md">
      <h4 className="mt-4 mb-4 font-semibold">TICKETS</h4>
      <div className="flex justify-center gap-8 mb-4">
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
        <div className="flex gap-2">
          <div>
            <label
              htmlFor="sortBy"
              className="mr-2">
              Sort By:
            </label>
            <select
              onChange={(e) => {
                dispatch({
                  type: ActionType.SortType,
                  payload: e.target.value,
                });
              }}
              className="w-24 h-[1.5rem] border border-black/25 rounded-sm"
              name="sortBy: "
              id="sortBy">
              <option value="title">Title</option>
              <option value="price">Price</option>
            </select>
          </div>
          <button
            onClick={() => {
              dispatch({
                type: ActionType.SortDirection,
                payload: !state.sorting.direction,
              });
            }}>
            {state.sorting.direction === true ? (
              <SortDown className="size-6" />
            ) : (
              <SortUp className="size-6" />
            )}
          </button>
        </div>
      </div>
      <ul className="gap-4">
        {loading && <p>loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {state.tickets &&
          state.tickets.map((ticket) => {
            return (
              <li
                key={ticket.id}
                className="mb-2">
                <Card
                  cardClass="pt-4 pb-4 flex justify-between items-center h-32 border border-black/10 shadow-sm rounded-md pl-8 pr-8 gap-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-black/5  duration-300"
                  leftClass="w-full flex-center"
                  left={
                    <>
                      <div className="min-w-16 max-w-32">
                        <img
                          src={ticket.img}
                          alt={ticket.title}
                          className="object-scale-down "
                        />
                      </div>
                      <div className="justify-start w-full h-24 pl-4">
                        <p
                          className={`text-h6 font-semibold text-start line-clamp-1`}>
                          {ticket.title}
                        </p>
                        <p
                          className={`w-full h-[3rem] leading-6 line-clamp-2 text-small indent-[1em] text-justify`}>
                          {ticket.description}
                        </p>
                      </div>
                    </>
                  }
                  rightClass="w-96 flex justify-end items-center"
                  right={
                    <div className="flex items-center justify-center gap-4 flex-nowrap">
                      <p className="text-h6">{ticket.price} THB</p>
                      <Button
                        onClick={() => {
                          handleButton(ticket.id, "increment", fetchdata);
                        }}
                        className="m-2 text-paragraph font-semibold border border-primary text-primary pr-[1.5rem] pl-[1.5rem] pt-[0.5rem] pb-[0.5rem]">
                        Add
                      </Button>
                    </div>
                  }
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TicketBoard;
