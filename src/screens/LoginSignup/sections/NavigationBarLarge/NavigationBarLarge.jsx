import React from "react";

export const NavigationBarLarge = () => {
  return (
    <div className="flex flex-col w-[375px] items-start gap-2 px-6 py-3 absolute top-px left-0">
      <div className="relative self-stretch mt-[-1.00px] font-title-2 font-[number:var(--title-2-font-weight)] text-inkdarkest text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] [font-style:var(--title-2-font-style)]">
        Welcome
      </div>

      <p className="relative self-stretch font-regular-normal-regular font-[number:var(--regular-normal-regular-font-weight)] text-inkdarkest text-[length:var(--regular-normal-regular-font-size)] tracking-[var(--regular-normal-regular-letter-spacing)] leading-[var(--regular-normal-regular-line-height)] [font-style:var(--regular-normal-regular-font-style)]">
        Log in to your account
      </p>
    </div>
  );
};
