import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TicketBoard from "./components/TicketBoard";
import { TicketData } from "./utils/model";
import { useApi } from "./hooks/useApi";

export type Discounts = {
  id: string;
  code: string;
  discount: number;
  type: string;
};

function App() {
  const ticketResponse = useApi<TicketData[]>("http://localhost:8000/tickets", {
    method: "GET",
  });
  const discountResponse = useApi<Discounts[]>(
    "http://localhost:8000/discounts",
    {
      method: "GET",
    }
  );

  return (
    <div className="flex flex-col justify-between h-full text-center">
      <Header />
      <div className="flex flex-col h-full gap-8 p-8 md:flex-row">
        <TicketBoard props={ticketResponse} />
        <Cart
          tickets={ticketResponse}
          discounts={discountResponse}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
