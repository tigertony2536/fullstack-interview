import { TicketData } from "../utils/model";
import axios from "axios";

type action = "increment" | "decrement";

export const handleButton = async (
  ticketId: string,
  action: action,
  fetchCartTicket: () => Promise<void>
) => {
  const getResponse = await axios.get<TicketData>(
    `http://localhost:8000/tickets/${ticketId}`
  );

  let amount = Number(getResponse.data.inCart);
  if (action === "increment") {
    amount = amount + 1;
  } else if (action === "decrement") {
    amount = amount - 1;
  }
  const putResponse = await axios.put<TicketData>(
    `http://localhost:8000/tickets/${ticketId}`,
    {
      ...getResponse.data,
      inCart: amount,
    }
  );
  console.log(putResponse);
  fetchCartTicket();
};
