import * as React from "react";

function SvgBurgerIcon(props) {
  return (
    <svg
      className="burger-icon_svg__fill-current burger-icon_svg__h-3 burger-icon_svg__w-3"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  );
}

export default SvgBurgerIcon;
