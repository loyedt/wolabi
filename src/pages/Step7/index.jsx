import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeRegistrationThunk } from '../../redux/slices/registrationSlice';
import logo from '../../assets/logo.png';

const Step7 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    firstName, lastName, password, birthday, phoneNumber, workAnniversary,
    acceptedPrivacyPolicy, areasOfInterest, wellbeingPillars, token, error,
  } = useSelector((s) => s.registration);

  useEffect(() => {
    const submit = async () => {
      const payload = {
        fname: firstName,
        lname: lastName,
        password,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        token,
        areas_of_interest: areasOfInterest,
        wellbeing_pillars: wellbeingPillars,
        accepted_privacy_policy: acceptedPrivacyPolicy,
        birthday,
        phone_number: phoneNumber,
        user_type: 0,
        language_id: 1,
        ...(workAnniversary && { work_anniversary: workAnniversary }),
      };
      const result = await dispatch(completeRegistrationThunk(payload));
      if (completeRegistrationThunk.fulfilled.match(result)) {
        navigate('/register/step8');
      } else {
        navigate('/register/step8');
      }
    };
    submit();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8]">
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 md:px-10">
        <img src={logo} alt="Woliba" className="h-8 md:h-10 object-contain" />
        <div className="flex items-center gap-2 text-sm text-[#1D3857] font-medium">
          <span>Language</span>
          <span className="flex items-center gap-1">🇺🇸 En</span>
        </div>
      </header>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
            <circle cx="52" cy="15" r="8" stroke="#1D3857" strokeWidth="3"/>
            <path d="M40 30 Q52 20 64 30 L70 55 L58 55 L56 70 L48 70 L46 55 L34 55 Z" stroke="#1D3857" strokeWidth="2.5" fill="none"/>
            <line x1="34" y1="72" x2="70" y2="72" stroke="#E07070" strokeWidth="4" strokeLinecap="round"/>
            <path d="M30 50 L20 48" stroke="#1D3857" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#E07070]/30 rounded-full overflow-hidden">
            <div className="h-full bg-[#E07070] rounded-full animate-pulse w-3/4" />
          </div>
        </div>

        <p className="text-[#1D3857] font-semibold text-center text-lg">
          Getting your wellness journey<br />ready...
        </p>
      </div>
    </div>
  );
};

export default Step7;
