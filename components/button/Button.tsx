import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
  style?: string;
  onclick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  href,
  style,
  onclick,
}) => {
  return (
    <Link
      href={`${href}`}
      className={`px-8 py-3 bg-custom-red text-center text-white rounded-full ${style}`}
      onClick={onclick}
    >
      {text}
    </Link>
  );
};
