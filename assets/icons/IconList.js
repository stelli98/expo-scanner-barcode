import React from "react";
import Svg, { Line } from "react-native-svg";

const IconList = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-list"
    >
      <Line x1="8" y1="6" x2="21" y2="6"></Line>
      <Line x1="8" y1="12" x2="21" y2="12"></Line>
      <Line x1="8" y1="18" x2="21" y2="18"></Line>
      <Line x1="3" y1="6" x2="3.01" y2="6"></Line>
      <Line x1="3" y1="12" x2="3.01" y2="12"></Line>
      <Line x1="3" y1="18" x2="3.01" y2="18"></Line>
    </Svg>
  );
};

export default IconList;
