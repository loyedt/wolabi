import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Step1 from '../pages/Step1';
import Step2 from '../pages/Step2';
import Step3 from '../pages/Step3';
import Step3b from '../pages/Step3b';
import Step4 from '../pages/Step4';
import Step5 from '../pages/Step5';
import Step6 from '../pages/Step6';
import Step7 from '../pages/Step7';
import Step8 from '../pages/Step8';

const Guard = ({ children, requires }) => {
  const reg = useSelector((s) => s.registration);
  for (const field of requires) {
    if (!reg[field]) return <Navigate to="/register/step1" replace />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/register/step1" replace />} />
    <Route path="/register/step1" element={<Step1 />} />
    <Route path="/register/step2" element={
      <Guard requires={['companyId']}><Step2 /></Guard>
    } />
    <Route path="/register/step3" element={
      <Guard requires={['companyId', 'email']}><Step3 /></Guard>
    } />
    <Route path="/register/step3b" element={
      <Guard requires={['token']}><Step3b /></Guard>
    } />
    <Route path="/register/step4" element={
      <Guard requires={['token']}><Step4 /></Guard>
    } />
    <Route path="/register/step5" element={
      <Guard requires={['token']}><Step5 /></Guard>
    } />
    <Route path="/register/step6" element={
      <Guard requires={['token']}><Step6 /></Guard>
    } />
    <Route path="/register/step7" element={
      <Guard requires={['token']}><Step7 /></Guard>
    } />
    <Route path="/register/step8" element={<Step8 />} />
    <Route path="*" element={<Navigate to="/register/step1" replace />} />
  </Routes>
);

export default AppRoutes;
