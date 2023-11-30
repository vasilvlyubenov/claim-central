/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        central: '#984e1e',
        'central-2': '#ffeccc',
        // 'central-bg': '#ffa91a',
      },
    },
  },
  plugins: [],
};

