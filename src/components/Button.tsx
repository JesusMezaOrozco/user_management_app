import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(ButtonProps: Props) {
  return (
    <button
      className="flex items-center justify-center bg-cyan-900 min-w-16 h-6 p-5 text-white rounded-[12px] font-medium"
      {...ButtonProps}
    >
      {ButtonProps.children}
    </button>
  );
}
