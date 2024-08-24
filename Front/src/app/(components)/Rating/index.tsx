import React from "react";
import { LuStar } from "react-icons/lu";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return [1, 2, 3, 4, 5].map((index) => (
    <LuStar
      key={index}
      color={index <= rating ? "#FFC107" : "#E4E5E9"}
      className="w-4 h-4"
    ></LuStar>
  ));
};

export default Rating;
