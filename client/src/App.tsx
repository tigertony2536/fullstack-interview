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
    <div className="text-center flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row justify-between p-8 gap-8">
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
