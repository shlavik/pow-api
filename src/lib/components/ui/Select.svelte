<script module>
	import type {
		SelectRootProps,
		SelectContentProps,
		SelectItemProps,
		SelectTriggerProps,
		SelectSingleRootProps,
	} from 'bits-ui'
	import type { Snippet } from 'svelte'

	export type SelectSize = 'sm' | 'md' | 'lg'
	export type SelectItem = {
		value: string
		label: string
		disabled?: boolean
	}

	export type SelectProps = Omit<SelectSingleRootProps, 'type'> & {
		class?: string
		items: SelectItem[]
		placeholder?: string
		icon?: Snippet
		value?: string
		itemClass?: string
		width?: string
		onValueChange?: (value: string) => void
	}
</script>

<script lang="ts">
	import { Select } from 'bits-ui'
	import Check from 'phosphor-svelte/lib/Check'
	import CaretUpDown from 'phosphor-svelte/lib/CaretUpDown'
	import CaretDoubleUp from 'phosphor-svelte/lib/CaretDoubleUp'
	import CaretDoubleDown from 'phosphor-svelte/lib/CaretDoubleDown'
	import { twMerge } from 'tailwind-merge'

	let {
		class: className,
		items = [],
		placeholder = 'Select an option',
		icon,
		value = $bindable(''),
		itemClass = '',
		width = 'w-full',
		onValueChange,
		...restProps
	}: SelectProps = $props()

	const selectedLabel = $derived(
		value ? items.find((item) => item.value === value)?.label || placeholder : placeholder
	)

	function handleValueChange(newValue: string) {
		value = newValue
		if (onValueChange) {
			onValueChange(newValue)
		}
	}
</script>

<Select.Root type="single" {...restProps} {value} onValueChange={handleValueChange} {items}>
	<Select.Trigger
		class={twMerge(
			`h-input rounded-9px border-border-input bg-background data-placeholder:text-foreground-alt/50 inline-flex ${width} hover:border-muted-foreground/50 focus:border-primary items-center border px-[11px] text-sm transition-colors select-none focus:outline-none`,
			className
		)}
		aria-label={placeholder}
	>
		{#if icon}
			<span class="mr-[9px]">
				{@render icon()}
			</span>
		{/if}
		<span class="w-[calc(100%-40px)] truncate text-start">{selectedLabel}</span>
		<CaretUpDown
			class="text-muted-foreground ml-auto size-6 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180"
		/>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="focus-override border-muted bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
			z-50 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] rounded-xl border
			px-1 py-3 outline-hidden select-none
			data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
			sideOffset={10}
		>
			<Select.ScrollUpButton
				class="text-muted-foreground hover:text-foreground flex h-6 w-full items-center justify-center transition-colors duration-150"
			>
				<CaretDoubleUp class="size-4" />
			</Select.ScrollUpButton>
			<Select.Viewport class="p-1">
				{#each items as item, i (i + item.value)}
					<Select.Item
						class={twMerge(
							'rounded-button data-highlighted:bg-muted hover:bg-muted/50 flex h-10 w-full items-center py-3 pr-1.5 pl-5 text-sm capitalize outline-hidden transition-colors duration-150 select-none data-disabled:opacity-50',
							itemClass
						)}
						value={item.value}
						label={item.label}
						disabled={item.disabled}
					>
						{#snippet children({ selected })}
							<span class="truncate">{item.label}</span>
							{#if selected}
								<div class="text-primary ml-auto">
									<Check class="size-4" />
								</div>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<Select.ScrollDownButton
				class="text-muted-foreground hover:text-foreground flex h-6 w-full items-center justify-center transition-colors duration-150"
			>
				<CaretDoubleDown class="size-4" />
			</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
</Select.Root>
