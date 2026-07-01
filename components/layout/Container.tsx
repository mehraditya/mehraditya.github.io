import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <main
      className={clsx(
        "mx-auto w-full max-w-[980px] px-6 md:px-10 lg:px-12",
        className
      )}
    >
      {children}
    </main>
  );
}