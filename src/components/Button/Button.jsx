/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

export const Button = ({
  label = "Button",
  hasIconEnd = false,
  hasIconStart = false,
  variant,
  stateProp,
  size,
  variantPrimaryClassName,
  divClassName,
  to,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "primary",

    state: stateProp || "default",

    size: size || "medium",
  });

  return (
    <Link to={to}>
      <button
        className={`all-[unset] box-border border border-solid border-color-border-brand-default inline-flex items-center gap-[var(--size-space-200)] pt-[var(--size-space-300)] pr-[var(--size-space-300)] pb-[var(--size-space-300)] pl-[var(--size-space-300)] overflow-hidden rounded-[var(--size-radius-200)] justify-center relative ${state.state === "hover" ? "bg-color-background-brand-hover" : "bg-color-background-brand-default"} ${variantPrimaryClassName}`}
        onMouseLeave={() => {
          dispatch("mouse_leave");
        }}
        onMouseEnter={() => {
          dispatch("mouse_enter");
        }}
      >
        <div
          className={`font-single-line-body-base w-fit mt-[-1.00px] tracking-[var(--single-line-body-base-letter-spacing)] text-[length:var(--single-line-body-base-font-size)] [font-style:var(--single-line-body-base-font-style)] text-[color:var(--color-text-brand-on-brand)] font-[number:var(--single-line-body-base-font-weight)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap relative ${divClassName}`}
        >
          {label}
        </div>
      </button>
    </Link>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}
