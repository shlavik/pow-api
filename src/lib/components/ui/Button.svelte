<script module>
	import type { ButtonRootProps } from 'bits-ui'

	export type ButtonVariant = 'default' | 'ghost' | 'outline' | 'accent'
	export type ButtonSize = 'sm' | 'md' | 'lg'
	export type ButtonProps = ButtonRootProps & {
		class?: string
		children: () => unknown
		variant?: ButtonVariant
		size?: ButtonSize
	}
</script>

<script lang="ts">
	import { Button } from 'bits-ui'
	import { twMerge } from 'tailwind-merge'

	let {
		class: className,
		children,
		variant = 'default',
		size = 'md',
		...restProps
	}: ButtonProps = $props()

	const variants = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/90',
		outline: 'border border-border-input hover:bg-muted',
		ghost: 'hover:bg-muted hover:text-foreground',
		accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
	}
	const sizes = {
		sm: 'h-9 px-3 text-xs',
		md: 'h-12 px-[21px] text-[15px]',
		lg: 'h-14 px-6 text-base',
	}
</script>

<Button.Root
	class={twMerge(
		'rounded-button shadow-btn inline-flex items-center justify-center font-semibold active:scale-[0.98] active:transition-all disabled:pointer-events-none disabled:opacity-50',
		variants[variant],
		sizes[size],
		className
	)}
	{...restProps}
>
	{@render children()}
</Button.Root>
