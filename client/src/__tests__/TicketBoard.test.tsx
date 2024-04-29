/**
 * @jest-environment jsdom
 */

import React from "react";
import { TicketBoard } from "../components/TicketBoard";
import { render, screen } from "@testing-library/react";
import Data from "../../api_mock/db.json";
import { TicketBoardProps, TicketData } from "../utils/model";
import "@testing-library/jest-dom";
import { Ticket } from "react-bootstrap-icons";

const mockFetchData = jest.fn();
mockFetchData.mockReturnValue(Promise<void>);

const tickets = Data.tickets;

const newTickets = tickets.map((ticket) => ({
  ...ticket,
  id: ticket.id.toString(),
}));

const props: TicketBoardProps = {
  data: newTickets,
  loading: false,
  error: null,
  fetchdata: mockFetchData,
};

describe("Test App", () => {
  test("should render card from data", () => {
    render(<TicketBoard props={props} />);
    expect(screen.getByText(/Siam Amazing Park/i)).toBeInTheDocument();
    expect(screen.getByText(/Safari World/i)).toBeInTheDocument();
    expect(screen.getByText(/Dream World/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sea Life Bangkok Ocean World/i)
    ).toBeInTheDocument();
  });
});
