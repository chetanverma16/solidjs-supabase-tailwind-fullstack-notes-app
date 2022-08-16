const Button = ({ onClick, classes, children }) => {
    return (
      <button
        onClick={onClick}
        className={`mt-4 px-2 py-2 bg-black text-white rounded-lg transition-all duration-200 hover:scale-105 ${classes}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;