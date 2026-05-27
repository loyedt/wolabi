import { useRef } from 'react';

const OTPInput = ({ value, onChange, length = 6 }) => {
  const inputs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;
    const newOtp = value.split('');
    newOtp[idx] = val[val.length - 1];
    onChange(newOtp.join(''));
    if (idx < length - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      const newOtp = value.split('');
      if (newOtp[idx]) {
        newOtp[idx] = '';
        onChange(newOtp.join(''));
      } else if (idx > 0) {
        inputs.current[idx - 1]?.focus();
        newOtp[idx - 1] = '';
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted.padEnd(length, '').slice(0, length));
    const nextIdx = Math.min(pasted.length, length - 1);
    inputs.current[nextIdx]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="w-12 h-12 border-2 border-gray-200 rounded-lg text-center text-lg font-semibold text-[#1D3857] focus:outline-none focus:border-[#E07070] transition-colors duration-200"
        />
      ))}
    </div>
  );
};

export default OTPInput;
