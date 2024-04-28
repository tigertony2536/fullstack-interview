import { TicketData } from "./model";

export const sortTickets = (
  tickets: TicketData[],
  sortBy: string,
  sortDirection: boolean
) => {
  if (sortBy === "title") {
    if (sortDirection === true) {
      return tickets.sort();
    } else {
      return tickets.sort().reverse();
    }
  } else if (sortBy === "price") {
    if (sortDirection === false) {
      return tickets.sort((a, b) => a.price - b.price);
    } else {
      return tickets.sort((a, b) => b.price - a.price);
    }
  }
};
