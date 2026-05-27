export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidName = (name) =>
  /^[a-zA-Z\s'-]+$/.test(name) && name.trim().length > 0;

export const isValidPassword = (pwd) =>
  pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);

export const isValidPhone = (phone) =>
  /^[+]?[\d\s\-().]{7,15}$/.test(phone);
