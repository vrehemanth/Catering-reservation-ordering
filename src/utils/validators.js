export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

export const isNotEmpty = (value) => {
  return value && value.trim() !== '';
};

export const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};
