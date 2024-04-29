import { Discounts } from "../App";
import React from "react";
import { DiscountState } from "../components/CartFooter";

export const handleSearchDiscount = async (
  e: React.ChangeEvent<HTMLInputElement>,
  discounts: Discounts[],
  setDiscount: React.Dispatch<React.SetStateAction<DiscountState>>,
  setDiscountInput: React.Dispatch<React.SetStateAction<string>>,
  total: number,
  discount: Discounts | null
) => {
  const target = e.target as HTMLInputElement;
  const serachParams = target?.value;
  setDiscountInput(serachParams);
  const findDiscount = discounts.find(
    (discount) => discount.code.toLowerCase() === serachParams.toLowerCase()
  );
  console.log(findDiscount);
  if (findDiscount === undefined) {
    setDiscount({
      discountAmount: 0,
      discount: discount,
    });
  } else {
    setDiscountHelper(findDiscount, setDiscount, total);
  }
};

export const setDiscountHelper = (
  discount: Discounts,
  setDiscount: React.Dispatch<React.SetStateAction<DiscountState>>,
  total: number
) => {
  if (discount) {
    if (discount.type === "amount") {
      setDiscount({
        discountAmount: discount.discount,
        discount: discount,
      });
    } else if (discount.type === "percentage") {
      const discountAmount = (discount.discount / 100) * total;
      setDiscount({
        discountAmount: discountAmount,
        discount: discount,
      });
    }
  }
};
