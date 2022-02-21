import { FC } from "react";

interface propsBlockFilter {
  className?: string;
  label: string;
}
export const BlockFilter: FC<propsBlockFilter> = ({
  children,
  className,
  label,
}) => {
  return (
    <div className={`py-4 px-6 border-b border-base relative ${className}`}>
      <h2 className="text-sm font-semibold text-primary capitalize">{label}</h2>
      <div className="w-full relative">{children}</div>
    </div>
  );
};
