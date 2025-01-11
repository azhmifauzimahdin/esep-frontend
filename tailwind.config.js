/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "greenx": "#2E8B57",
        "greens": "#0BAB64",
        "greene": "#3BB78F",
        "blues": "#2A52BE",
        "bluee": "#007FFF",
        "yellows": "#FBB034",
        "yellowe": "#FFDD00",
        "grays": "#889bb5",
        "graye": "#8d9db3",
        "gray": "#343A40"
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
  },
  plugins: [],
}

