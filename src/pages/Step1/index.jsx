import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { setField, verifyCompanyThunk, clearError } from '../../redux/slices/registrationSlice';
import { isValidPassword } from '../../utils/validation';

const Step1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.registration);

  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!companyName.trim()) e.companyName = 'Company name is required';
    if (!password) e.password = 'Password is required';
    else if (!isValidPassword(password))
      e.password = 'Min 8 chars, 1 uppercase, 1 number required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    dispatch(clearError());

    const result = await dispatch(verifyCompanyThunk({ company_name: companyName, password }));
    if (verifyCompanyThunk.fulfilled.match(result)) {
      dispatch(setField({ field: 'companyName', value: companyName }));
      navigate('/register/step2');
    }
  };

  const isReady = companyName.trim() && password;

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-[#1D3857]">Registration</h2>

        <InputField
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter Company Name"
          error={errors.companyName}
        />

        <InputField
          label="Company Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Company Password"
          error={errors.password}
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" disabled={!isReady || loading}>
          {loading ? 'Verifying...' : 'Next'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Step1;
