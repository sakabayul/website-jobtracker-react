const ComponentButton = ({ type = "button", onClick, children, variant = "default" }) => {
  const baseClass = "px-4 py-2 rounded cursor-pointer";
  const variants = {
    delete: "bg-red-500 text-white hover:bg-red-600",
    cancel: "bg-gray-300 hover:bg-gray-400",
    save: "bg-blue-600 text-white hover:bg-blue-700",
    default: "bg-gray-800 text-white hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variants[variant] || variants.default}`}
    >
      {children}
    </button>
  );
};

export default ComponentButton;
