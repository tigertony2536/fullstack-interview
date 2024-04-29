import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export const useApi = <T>(
  url: string,
  options?: AxiosRequestConfig,
  dependency?: React.DependencyList
) => {
  const [data, Setdata] = useState<T | null>(null);
  const [loading, Setloading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchdata = async () => {
    try {
      Setloading(true);
      const res: AxiosResponse<ApiResponse<T>> = await axios(url, options);
      if (res.data.data as ApiResponse<T>) {
        Setdata(res.data.data);
        Setloading(false);
      } else {
        Setdata(res.data as T);
        Setloading(false);
      }
    } catch (error) {
      setError(error as AxiosError);
      console.log((error as AxiosError).message);
    }
    Setloading(false);
  };

  useEffect(() => {
    fetchdata();
  }, [dependency]);

  return { data, loading, error, fetchdata };
};
