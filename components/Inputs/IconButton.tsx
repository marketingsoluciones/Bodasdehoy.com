import React, { Children, cloneElement, FC, useEffect } from "react";
import { ButtonHTMLAttributes, useState } from 'react';

const sizes = {
    xs : "w-3 h-3",
    sm : "w-4 h-4",
    md : "w-6 h-6",
    lg : "w-10 h-10",
}
interface propsIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  size : keyof typeof sizes
}
const IconButton: FC<propsIconButton> = ({ variant, children, size = "sm", ...props }) => {
    const [childrenArray] = useState<any>(
        Children.toArray(children)
      );

    
  return (
    <>
      {(() => {
        switch (variant) {
          case "primary":
            return (
              <button
                type="button"
                className="text-white bg-primary hover:opacity-80 focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                {...props}
              >
               {childrenArray.length > 0 && cloneElement(childrenArray[0], {className: sizes[size]})}
              </button>
            );
            break;

          default:
            break;
        }
      })()}
    </>
  );
};

export default IconButton;
