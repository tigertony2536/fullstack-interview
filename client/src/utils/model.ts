import { AxiosError } from "axios";

export type TicketData = {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  inCart: number;
};

export type TicketBoardProps = {
  data: TicketData[] | null;
  loading: boolean;
  error: AxiosError<unknown, any> | null;
  fetchdata: () => Promise<void>;
};
