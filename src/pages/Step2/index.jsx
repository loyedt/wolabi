import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { setField, saveUserThunk, clearError } from '../../redux/slices/registrationSlice';
import { isValidEmail, isValidName } from '../../utils/validation';

const Step2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyId, companyName, loading, error } = useSelector((s) => s.registration);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!isValidEmail(email)) e.email = 'Enter a valid email address';
    if (!isValidName(firstName)) e.firstName = 'First name cannot contain numbers or special characters';
    if (!isValidName(lastName)) e.lastName = 'Last name cannot contain numbers or special characters';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    dispatch(clearError());

    const result = await dispatch(saveUserThunk({ company_id: companyId, mail: email, fname: firstName, lname: lastName }));
    if (saveUserThunk.fulfilled.match(result)) {
      dispatch(setField({ field: 'email', value: email }));
      dispatch(setField({ field: 'firstName', value: firstName }));
      dispatch(setField({ field: 'lastName', value: lastName }));
      navigate('/register/step3');
    }
  };

  const isReady = email && firstName && lastName;

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-[#1D3857]">Registration</h2>

        <InputField
          label="Email ID"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email id"
          error={errors.email}
        />

        <InputField
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter First name"
          error={errors.firstName}
        />

        <InputField
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter Last name"
          error={errors.lastName}
        />

        <InputField
          label="Company name"
          value={companyName}
          disabled
          placeholder="Company name"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" disabled={!isReady || loading}>
          {loading ? 'Sending OTP...' : 'Verify email'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Step2;
