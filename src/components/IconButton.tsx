import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton(ButtonProps: Props) {
  return (
    <button
      {...ButtonProps}
      className="flex items-center bg-cyan-900 p-3 text-white rounded-full font-medium"
    >
      {ButtonProps.children}
    </button>
  );
}
