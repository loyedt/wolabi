import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import OTPInput from '../../components/OTPInput/OTPInput';
import Button from '../../components/ui/Button';
import { verifyOTPThunk, resendOTPThunk, clearError } from '../../redux/slices/registrationSlice';

const TIMER_SECONDS = 180;

const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, email, token } = useSelector((s) => s.registration);

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')} : ${String(s % 60).padStart(2, '0')}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 6) return;
    dispatch(clearError());
    const result = await dispatch(verifyOTPThunk({ otp, token }));
    if (verifyOTPThunk.fulfilled.match(result)) {
      navigate('/register/step4');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    dispatch(clearError());
    const result = await dispatch(resendOTPThunk({ email }));
    if (resendOTPThunk.fulfilled.match(result)) {
      setOtp('');
      setTimer(TIMER_SECONDS);
      setCanResend(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1D3857] mb-2">Input verification code</h2>
          <p className="text-sm text-gray-500">
            We've sent a 6-digit OTP to your work email. Please enter it below to continue.
          </p>
        </div>

        <OTPInput value={otp} onChange={setOtp} length={6} />

        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="text-[#1D3857] text-sm font-semibold hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-[#1D3857] text-sm font-medium">
              Resend OTP in {formatTime(timer)}
            </span>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex gap-3">
          <Button variant="back" onClick={() => navigate('/register/step2')} />
          <Button type="submit" disabled={otp.length < 6 || loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Step3;
