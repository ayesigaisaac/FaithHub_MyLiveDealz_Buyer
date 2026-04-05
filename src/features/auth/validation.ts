export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPassword(value: string, minLength = 6) {
  return value.trim().length >= minLength;
}

export function validateConfirmPassword(password: string, confirmPassword: string) {
  return password === confirmPassword;
}

