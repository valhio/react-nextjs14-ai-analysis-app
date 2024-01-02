import { IconType } from "react-icons";
import clsx from "clsx";

interface AuthSocialButtonProps {
  social: "Google" | "Facebook" | "Github" | undefined
  icon: IconType;
  text?: string;
  color?: string;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  social,
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
        social === "Google"
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200"
          : social === "Facebook"
          ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200"
          : social === "Github"
          ? "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-50 focus:ring-blue-500 focus:ring-offset-blue-200"
      )}>
      <Icon className="w-5 h-5" aria-hidden="true" />
      <span className="ml-3">{text}</span>
    </button>
  );
};

export default AuthSocialButton;
