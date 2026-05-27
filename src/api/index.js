import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export const verifyCompany = (company_name, password) =>
  api.post('/verify-by-company-name-and-password', { company_name, password });

export const saveUserAndSendOTP = (company_id, mail, fname, lname) =>
  api.post('/save-user-details-and-send-otp', { company_id, mail, fname, lname });

export const verifyOTP = (otp, token) =>
  api.post('/verify-otp-for-user-registration', { otp, token });

export const resendOTP = (email) =>
  api.post('/send-otp-for-user-registration', { email });

export const getWellnessInterests = () =>
  api.get('/viewWellnessInterest');

export const getWellbeingPillars = () =>
  api.get('/get-wellbeing-pillars/1');

export const completeRegistration = (payload) =>
  api.post('/user-registration', payload);

export const CLOUDFRONT_BASE = 'https://d38xnw03cl4zf4.cloudfront.net';
