import { Card } from "./Card";
import { useState, useEffect } from "react";
import { Discounts } from "../App";
import { dataType } from "./Cart";
import { handleSearchDiscount } from "../utils/handleSearchDiscount";
import { setDiscountHelper } from "../utils/handleSearchDiscount";
import { TicketData } from "../utils/model";

export interface DiscountState {
  discountAmount: number;
  discount: Discounts | null;
}

type CardFooterProps = {
  tickets: dataType<TicketData>;
  discounts: dataType<Discounts>;
};

export const CartFooter: React.FC<CardFooterProps> = ({
  tickets,
  discounts,
}) => {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState<DiscountState>({
    discountAmount: 0,
    discount: null,
  });
  const [discountInput, setDiscountInput] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);

  const {
    data: discountsData,
    loading: loadDiscount,
    error: discountError,
  } = discounts;

  useEffect(() => {
    if (tickets.data) {
      const cartTickets = tickets.data.filter((ticket) => ticket.inCart !== 0);
      const total = cartTickets.reduce((acc, ticket) => {
        return acc + ticket.price * ticket.inCart;
      }, 0);
      setTotal(total);
      if (discount) {
        setGrandTotal(total - discount.discountAmount);
      }
    }
    if (discount && discount.discount?.type === "percentage") {
      setDiscountHelper(discount.discount, setDiscount, total);
    }
  }, [tickets, total]);

  useEffect(() => {
    if (discount && discount.discount?.type === "percentage") {
      setDiscountHelper(discount.discount, setDiscount, total);
    }
  }, [total]);

  return (
    <div className="flex flex-col items-center justify-end w-full h-full pt-8 pb-4 text-h6">
      <Card
        cardClass="flex justify-between h-12 "
        left={<div className="flex justify-start pl-8">Total</div>}
        right={<div className="flex justify-end pr-8">{total} THB</div>}
      />
      <Card
        cardClass="flex justify-between h-12"
        leftClass="w-72 gap-2 flex justify-start pl-8"
        left={
          <>
            <div className="flex-start">Discount</div>
            <input
              value={discountInput}
              onChange={(e) => {
                if (discountsData) {
                  handleSearchDiscount(
                    e,
                    discountsData,
                    setDiscount,
                    setDiscountInput,
                    total,
                    discount.discount
                  );
                }
              }}
              className="h-6 pl-4 border rounded-sm min-w-32 max-w-64 border-black/25"></input>
          </>
        }
        right={
          <div className="flex justify-end pr-8">
            {loadDiscount && <p>Loading...</p>}
            {discountError && <p>{discountError.message}</p>}
            {discount.discountAmount} THB
          </div>
        }
      />

      <Card
        cardClass="flex justify-between h-12"
        left={<div className="flex justify-start pl-8">Grand Total</div>}
        right={<div className="flex justify-end pr-8">{grandTotal} THB</div>}
      />
    </div>
  );
};
