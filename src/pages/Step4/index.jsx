import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import { setField } from '../../redux/slices/registrationSlice';
import { isValidPassword, isValidPhone } from '../../utils/validation';

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E07070" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Step4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [workAnniversary, setWorkAnniversary] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!isValidPassword(password)) e.password = 'Min 8 chars, 1 uppercase, 1 number required';
    if (password !== confirm) e.confirm = 'Passwords do not match. Please re-enter.';
    if (!birthday) e.birthday = 'Date of birth is required';
    if (!isValidPhone(phone)) e.phone = 'Enter a valid phone number';
    if (!agreed) e.agreed = 'You must agree to the Terms of Service';
    return e;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    dispatch(setField({ field: 'password', value: password }));
    dispatch(setField({ field: 'birthday', value: birthday }));
    dispatch(setField({ field: 'phoneNumber', value: phone }));
    dispatch(setField({ field: 'workAnniversary', value: workAnniversary }));
    dispatch(setField({ field: 'acceptedPrivacyPolicy', value: agreed }));
    navigate('/register/step5');
  };

  const formatDisplayDate = (d) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${m}/${day}/${y}`;
  };

  const isReady = password && confirm && birthday && phone && agreed;

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-navy">Login Credentials</h2>

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          error={errors.password}
        />

        <InputField
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Enter password"
          error={errors.confirm}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-navy">Birthday</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={formatDisplayDate(birthday)}
              onClick={() => setShowDatePicker(true)}
              placeholder="Select date of birth [MM/DD/YYYY]"
              className={`w-full border rounded-lg px-4 py-3 text-navy placeholder-gray-400 cursor-pointer focus:outline-none ${errors.birthday ? 'border-red-400' : 'border-gray-200 focus:border-coral'}`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CalendarIcon />
            </span>
          </div>
          {errors.birthday && <p className="text-red-500 text-xs">{errors.birthday}</p>}
        </div>

        <InputField
          label="Contact number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter contact number"
          error={errors.phone}
        />

        <InputField
          label="Work Anniversary (Optional)"
          value={workAnniversary}
          onChange={(e) => setWorkAnniversary(e.target.value)}
          placeholder="MM/DD/YYYY"
        />

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${agreed ? 'bg-[#E07070] border-[#E07070]' : 'border-gray-300'}`}
          >
            {agreed && (
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                <path d="M1 4l3.5 3.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <p className="text-sm text-gray-600">
            I agree to Woliba's{' '}
            <a href="#" className="text-[#E07070] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#E07070] hover:underline">Privacy Policy</a>.
          </p>
        </div>
        {errors.agreed && <p className="text-red-500 text-xs -mt-3">{errors.agreed}</p>}

        <div className="flex gap-3 mt-2">
          <Button variant="back" onClick={() => navigate('/register/step3')} />
          <Button onClick={handleNext} disabled={!isReady}>Next</Button>
        </div>
      </div>

      {showDatePicker && (
        <DatePickerModal
          value={birthday}
          onChange={(d) => setBirthday(d || '')}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </AuthLayout>
  );
};

export default Step4;
