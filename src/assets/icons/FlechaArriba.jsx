import * as React from "react";
const FlechaArriba = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    transform="rotate(180)"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <g
      stroke="#292929"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      clipPath="url(#checkmark_svg__a)"
    >
      <path d="m7 10 5 5M12 15l5-5" />
    </g>
    <defs>
      <clipPath id="checkmark_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default FlechaArriba;
