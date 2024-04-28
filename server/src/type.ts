export type Ticket = {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  inCart: number;
};

export type Discount = {
  id: string;
  code: string;
  discount: number;
  type: string;
};
