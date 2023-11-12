import React from "react";
import Svg, { Path, Circle, Polyline } from "react-native-svg";

const IconScanActive = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9775C5"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-user-check"
    >
      <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></Path>
      <Circle cx="8.5" cy="7" r="4"></Circle>
      <Polyline points="17 11 19 13 23 9"></Polyline>
    </Svg>
  );
};

export default IconScanActive;
