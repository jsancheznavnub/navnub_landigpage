
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], 
        display: ['Montserrat', 'sans-serif'], 
        body: ['Open Sans', 'sans-serif'], 
        lato: ['Lato', 'sans-serif'], 
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))', // #003366 - Azul Profundo (Principal)
          foreground: 'hsl(var(--primary-foreground))', // #FFFFFF - Blanco (Texto sobre primario)
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // #66CCFF - Azul Cielo (Secundario)
          foreground: 'hsl(var(--secondary-foreground))', // #003366 o #333333 (Texto sobre secundario claro)
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // #E0E0E0 o #2C2C4A (Fondos/elementos silenciados)
          foreground: 'hsl(var(--muted-foreground))', // #666666 o #CCCCCC (Texto silenciado)
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // #66CC99 - Verde Menta (Acento)
          foreground: 'hsl(var(--accent-foreground))', // #FFFFFF o #333333 (Texto sobre acento)
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))', // #E0E0E0 o #2C2C4A (Bordes)
        input: 'hsl(var(--input))', // Ligeramente diferente del fondo
        ring: 'hsl(var(--primary))', // Usar el color primario para anillos de enfoque
        cta: {
          DEFAULT: 'hsl(var(--cta))',
          foreground: 'hsl(var(--cta-foreground))',
        },
        'footer-background': 'hsl(var(--footer-background))',
        'footer-foreground': 'hsl(var(--footer-foreground))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')
  ],
} satisfies Config;
