import { AxiosError } from "axios";
import { handleButton } from "../utils/handleButton";
import { Card } from "./Card";
import { Button } from "./Button";
import { TicketData } from "../utils/model";
import { Discounts } from "../App";
import { CartFooter } from "./CartFooter";

export type dataType<T> = {
  data: T[] | null;
  loading: boolean;
  error: AxiosError<unknown, any> | null;
  fetchdata: () => Promise<void>;
};

interface CartProps {
  tickets: dataType<TicketData>;
  discounts: dataType<Discounts>;
}

export const Cart: React.FC<CartProps> = ({ tickets, discounts }) => {
  const {
    data: ticketsData,
    loading: loadTicket,
    error: ticketError,
    fetchdata: fetchTicket,
  } = tickets;

  return (
    <div className="min-w-[350px] w-full md:w-3/5 flex flex-col p-2 border border-black/25 bg-white rounded-md">
      <h4 className="mt-4 mb-4 font-semibold">CART</h4>
      <div>
        <ul>
          {loadTicket && <p>Loading...</p>}
          {ticketError && <p className="text-red-500">{ticketError.message}</p>}
          {ticketsData &&
            ticketsData
              .filter((ticket) => ticket.inCart !== 0)
              .map((ticket) => {
                return (
                  <li
                    key={ticket.id}
                    className="mb-2">
                    <Card
                      cardClass="flex justify-between h-24 border border-black/10 shadow-sm rounded-md pl-8 pr-8 pt-4 pb-4 gap-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-black/5  duration-300"
                      leftClass="min-w-56 max-w-full flex-center"
                      left={
                        <>
                          <div className="w-full">
                            <img
                              src={ticket.img}
                              alt={ticket.title}
                              className="object-scale-down"
                            />
                          </div>
                          <div className="flex flex-col justify-center w-full h-full pl-4 ">
                            <p
                              className={`text-paragraph font-semibold text-start line-clamp-1`}>
                              {ticket.title}
                            </p>
                            <p className={`text-start w-full text-small`}>
                              {ticket.price} THB
                            </p>
                          </div>
                        </>
                      }
                      rightClass="flex max-w-48 justify-between items-center p-2 gap-2"
                      right={
                        <>
                          <Button
                            onClick={() => {
                              handleButton(ticket.id, "decrement", fetchTicket);
                            }}
                            className="ml-2 font-semibold border border-black/25 bg-black/5 text-h4 size-8">
                            -
                          </Button>
                          <p className="text-paragraph">{ticket.inCart}</p>
                          <Button
                            onClick={() => {
                              handleButton(ticket.id, "increment", fetchTicket);
                            }}
                            className="mr-2 font-semibold border border-black/25 bg-black/5 text-h4 size-8">
                            +
                          </Button>
                        </>
                      }
                    />
                  </li>
                );
              })}
        </ul>
      </div>
      <CartFooter
        discounts={discounts}
        tickets={tickets}
      />
    </div>
  );
};

export default Cart;
