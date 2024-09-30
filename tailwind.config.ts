import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--color-accent)",
        white: "var(--color-white)",
        black: "var(--color-black)",
        
        // Neutral Colors
        "dark-gray": "var(--color-dark-gray)",
        gray: "var(--color-gray)",
        "light-gray": "var(--color-light-gray)",
        
        // Service Colors
        error: "var(--color-error)",
      },
      fontFamily: {
        dmSans: ["var(--font-dm-sans)", "sans-serif"],
        allertaStencil: ["var(--font-allerta-stencil)", "sans-serif"]
      },
      fontSize: {
        // Desktop Sizes
        'h1-desktop': ['33px', { lineHeight: '1', fontWeight: '500' }], // Medium weight
        'h2-desktop': ['26px', { lineHeight: '35px', fontWeight: '400' }], // Regular weight
        'h3-desktop': ['20px', { lineHeight: '26px', fontWeight: '400' }], // Regular weight
        'h4-desktop': ['20px', { lineHeight: '20px', fontWeight: '500' }], // Medium weight
        'h5-desktop': ['16px', { lineHeight: '27px', fontWeight: '400', letterSpacing: '0.5px' }], // Regular weight
        'body-large': ['16px', { lineHeight: '1', fontWeight: '700' }], // Bold weight
        'body-medium': ['14px', { lineHeight: '1', fontWeight: '400' }], // Regular weight
        'body-small': ['12px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.5px' }], // Regular weight

        // Mobile Sizes
        'h1-mobile': ['20px', { lineHeight: '26px', fontWeight: '400' }], // Regular weight
        'h2-mobile': ['16px', { lineHeight: '27px', fontWeight: '400', letterSpacing: '0.5px' }], // Regular weight
        'h3-mobile': ['14px', { lineHeight: '1', fontWeight: '400' }], // Regular weight
        'body-small-mobile': ['12px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.5px' }], // Regular weight
      },
      container: {
        center: true, // Center the container by default
        padding: '1rem', // Add padding around the container (optional, adjust as needed)
        screens: {
          // Customize screen sizes for container max width
          DEFAULT: '1248px',
          // Optionally, override other breakpoints if needed
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1248px', // Apply the 1248px max width at the xl breakpoint
          '2xl': '1248px', // Ensure it remains at 1248px for larger screens
        },
      },
    },
  },
  plugins: [],
};
export default config;
