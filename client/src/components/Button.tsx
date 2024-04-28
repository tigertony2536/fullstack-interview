import { ReactNode } from "react";
import { cn } from "../utils/cn";

type buttonProps = {
  className?: string;
  children: ReactNode;
  onClick: () => void;
};

export const Button = ({ className, children, onClick }: buttonProps) => {
  const baseClass =
    "flex-center rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-primary hover:text-white duration-300";
  return (
    <button
      onClick={onClick}
      className={cn(baseClass, className)}>
      {children}
    </button>
  );
};
