import { fontFamily } from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				background: 'var(--color-background)',
				'background-alt': 'var(--color-background-alt)',
				foreground: 'var(--color-foreground)',
				'foreground-alt': 'var(--color-foreground-alt)',
				muted: 'var(--color-muted)',
				'muted-foreground': 'var(--color-muted-foreground)',
				border: 'var(--color-border)',
				'border-input': 'var(--color-border-input)',
				'border-input-hover': 'var(--color-border-input-hover)',
				'border-card': 'var(--color-border-card)',
				dark: 'var(--color-dark)',
				'dark-10': 'var(--color-dark-10)',
				'dark-40': 'var(--color-dark-40)',
				'dark-04': 'var(--color-dark-04)',
				accent: 'var(--color-accent)',
				'accent-foreground': 'var(--color-accent-foreground)',
				destructive: 'var(--color-destructive)',
				tertiary: 'var(--color-tertiary)',
				line: 'var(--color-line)',
				contrast: 'var(--color-contrast)',
				primary: 'var(--color-dark)',
				'primary-foreground': 'var(--color-background)',
			},
			borderRadius: {
				card: 'var(--radius-card)',
				'card-lg': 'var(--radius-card-lg)',
				'card-sm': 'var(--radius-card-sm)',
				input: 'var(--radius-input)',
				button: 'var(--radius-button)',
				xs: 'var(--radius-5px)',
			},
			boxShadow: {
				mini: 'var(--shadow-mini)',
				'mini-inset': 'var(--shadow-mini-inset)',
				popover: 'var(--shadow-popover)',
				kbd: 'var(--shadow-kbd)',
				btn: 'var(--shadow-btn)',
				card: 'var(--shadow-card)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
				mono: ['var(--font-mono)', ...fontFamily.mono],
				alt: ['var(--font-alt)'],
				display: ['var(--font-display)'],
			},
			height: {
				input: 'var(--spacing-input)',
				'input-sm': 'var(--spacing-input-sm)',
			},
			animation: {
				'accordion-down': 'var(--animate-accordion-down)',
				'accordion-up': 'var(--animate-accordion-up)',
				'caret-blink': 'var(--animate-caret-blink)',
				'scale-in': 'var(--animate-scale-in)',
				'scale-out': 'var(--animate-scale-out)',
				'fade-in': 'var(--animate-fade-in)',
				'fade-out': 'var(--animate-fade-out)',
				'enter-from-left': 'var(--animate-enter-from-left)',
				'enter-from-right': 'var(--animate-enter-from-right)',
				'exit-to-left': 'var(--animate-exit-to-left)',
				'exit-to-right': 'var(--animate-exit-to-right)',
			},
			fontSize: {
				xxs: 'var(--text-xxs)',
			},
		},
	},
	plugins: [tailwindcssAnimate],
}

export default config
