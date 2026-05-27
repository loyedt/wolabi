import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

const Step3b = () => {
  const navigate = useNavigate();
  const { firstName, lastName, email, companyName } = useSelector((s) => s.registration);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-[#1D3857]">Registration</h2>

        <InputField label="First name" value={firstName} disabled />
        <InputField label="Last name" value={lastName} disabled />
        <InputField label="Work email" value={email} disabled />
        <InputField label="Company name" value={companyName} disabled />

        <Button onClick={() => navigate('/register/step4')}>Next</Button>
      </div>
    </AuthLayout>
  );
};

export default Step3b;
