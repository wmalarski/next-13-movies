import { ReactElement } from "react";

type Props = {
  rating?: number;
};

export const Stars = (props: Props): ReactElement => {
  const value = Math.round((props.rating || 0) * 10) / 10;

  return (
    <div className="relative flex flex-row items-center gap-2">
      <img src="/images/stars.png" className="h-3 w-20" alt="rating" />
      <img
        src="/images/stars-filled.png"
        className="absolute h-3 w-20"
        alt="rating"
        style={{ clipPath: `inset(0px ${100 - value * 10}% 0px 0px)` }}
      />
      <div className="text-sm opacity-80">{value}</div>
    </div>
  );
};
