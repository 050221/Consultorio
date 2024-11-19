interface ButtonCancelProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonCancel = ({
  children,
  onClick,
  className = ""
}: ButtonCancelProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-gray-700  font-semibold border border-gray-300 hover:border-gray-400 hover:text-gray-900 hover:underline decoration-1 rounded-md py-2 px-4 transition duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  )
}

export default ButtonCancel;