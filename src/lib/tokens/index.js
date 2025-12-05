// Tokens de diseño para uso en JavaScript
// Los tokens CSS están en los archivos .css correspondientes
// Este archivo solo exporta valores para casos donde se necesiten en JavaScript

export const colors = {
  primary: '#0ea5e9', // --blue-500
  secondary: '#a855f7', // --purple-500
  success: '#10b981', // --green-500
  error: '#ef4444', // --red-500
  text: '#171717', // --gray-900
  textLight: '#737373', // --gray-500
  textDisabled: '#a3a3a3', // --gray-400
  bg: '#ffffff',
  bgLight: '#fafafa', // --gray-50
  bgTertiary: '#f5f5f5', // --gray-100
  border: '#e5e5e5', // --gray-200
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const radius = {
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
};

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  '4xl': '3rem',
};

export const opacity = {
  disabled: 0.5,
  hover: 0.9,
  focus: 0.1,
};

// Helper para convertir hex a rgba
export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
