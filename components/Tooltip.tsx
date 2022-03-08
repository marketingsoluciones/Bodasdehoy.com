import { createRef, FC } from "react";

interface propsTooltip {
    tooltipText : string
}

export const Tooltip : FC <propsTooltip> = ({ children, tooltipText }) => {
    //@ts-ignore
    const tipRef: any = createRef(null);
    function handleMouseEnter() {
        tipRef.current.style.opacity = 1;
        tipRef.current.style.marginBottom = "20px";
    }
    function handleMouseLeave() {
        tipRef.current.style.opacity = 0;
        tipRef.current.style.marginBottom = "10px";
    }
    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150 text-xs"
                style={{ bottom: "70%", left: "-50%", opacity: 0 }}
                ref={tipRef}
            >
                {tooltipText}
            </div>
            {children}
        </div>
    );
}