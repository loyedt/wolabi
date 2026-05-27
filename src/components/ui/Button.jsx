const Button = ({ children, onClick, disabled, variant = 'primary', type = 'button', className = '' }) => {
  if (variant === 'back') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`border border-[#E07070] text-[#E07070] font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all duration-200 hover:bg-[#E07070]/10 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
          <path d="M7 1L1.5 6.5L7 12" stroke="#E07070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#E07070] text-white font-semibold py-3 px-6 rounded-full w-full transition-all duration-200 hover:bg-[#C85E5E] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
