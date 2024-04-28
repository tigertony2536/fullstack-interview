import { ReactNode } from "react";
import { cn } from "../utils/cn";

type CardProps = {
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
  cardClass?: string;
  leftClass?: string;
  middleClass?: string;
  rightClass?: string;
};

export const Card = ({
  left,
  middle,
  right,
  cardClass,
  leftClass,
  middleClass,
  rightClass,
}: CardProps) => {
  const baseCardClass = "flex w-full ";
  const baseContentClass = "min-w-24 w-1/3 h-full  overflow-hidden";
  return (
    <div className={cn(baseCardClass, cardClass)}>
      {left && <div className={cn(baseContentClass, leftClass)}>{left}</div>}
      {middle && (
        <div className={cn(baseContentClass, middleClass)}>{middle}</div>
      )}
      {right && <div className={cn(baseContentClass, rightClass)}>{right}</div>}
    </div>
  );
};

export default Card;
