import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				custom: 'var(--color-accent)',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'dark-gray': 'var(--color-dark-gray)',
  			gray: 'var(--color-gray)',
  			'light-gray': 'var(--color-light-gray)',
  			error: 'var(--color-error)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			dmSans: ["var(--font-dm-sans)", "sans-serif"],
  			allertaStencil: ["var(--font-allerta-stencil)", "sans-serif"]
  		},
  		fontSize: {
  			'h1-desktop': ['33px', { lineHeight: '1', fontWeight: '500' }],
  			'h2-desktop': ['26px', { lineHeight: '35px', fontWeight: '400' }],
  			'h3-desktop': ['20px', { lineHeight: '26px', fontWeight: '400' }],
  			'h4-desktop': ['20px', { lineHeight: '20px', fontWeight: '500' }],
  			'h5-desktop': ['16px', { lineHeight: '27px', fontWeight: '400', letterSpacing: '0.5px' }],
  			'body-large': ['16px', { lineHeight: '1', fontWeight: '700' }],
  			'body-medium': ['14px', { lineHeight: '1', fontWeight: '400' }],
  			'body-small': ['12px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.5px' }],
  			'h1-mobile': ['20px', { lineHeight: '26px', fontWeight: '400' }],
  			'h2-mobile': ['16px', { lineHeight: '27px', fontWeight: '400', letterSpacing: '0.5px' }],
  			'h3-mobile': ['14px', { lineHeight: '1', fontWeight: '400' }],
  			'body-small-mobile': ['12px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.5px' }]
  		},
  		container: {
  			center: true,
  			padding: '1rem',
  			screens: {
  				DEFAULT: '1248px',
  				sm: '640px',
  				md: '768px',
  				lg: '1024px',
  				xl: '1248px',
  				'2xl': '1248px'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
