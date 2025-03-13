<script module>
	import type {
		DialogRootProps,
		DialogContentProps,
		DialogTriggerProps,
		DialogCloseProps,
	} from 'bits-ui'
	import type { Snippet } from 'svelte'

	export type DialogSize = 'sm' | 'md' | 'lg'
	export type DialogApi = {
		openDialog: () => void
		closeDialog: () => void
	}
	export type DialogProps = DialogRootProps & {
		class?: string
		title?: string
		description?: string
		trigger?: Snippet
		children?: Snippet<[DialogApi]>
		content?: Snippet<[DialogApi]>
		footer?: Snippet<[DialogApi]>
		size?: DialogSize
		showClose?: boolean
		open?: boolean
	}
</script>

<script lang="ts">
	import { Dialog, Label } from 'bits-ui'
	import X from 'phosphor-svelte/lib/X'
	import { twMerge } from 'tailwind-merge'

	import Separator from './Separator.svelte'

	let {
		class: className,
		title,
		description,
		children,
		content,
		trigger,
		footer,
		size = 'md',
		showClose = true,
		open = $bindable(false),
		...restProps
	}: DialogProps = $props()

	export function openDialog() {
		open = true
	}

	export function closeDialog() {
		open = false
	}

	const sizes = {
		sm: 'sm:max-w-[400px]',
		md: 'sm:max-w-[490px]',
		lg: 'sm:max-w-[640px]',
	}
</script>

<Dialog.Root bind:open {...restProps}>
	{#if trigger}
		<Dialog.Trigger>
			{@render trigger()}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class={twMerge(
				'rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border p-5 outline-hidden md:w-full',
				sizes[size],
				className
			)}
		>
			{#if title}
				<Dialog.Title class="text-lg font-semibold tracking-tight">
					{title}
				</Dialog.Title>
			{/if}

			{#if description}
				<Dialog.Description class="text-foreground-alt mb-4 text-sm">
					{description}
				</Dialog.Description>
			{/if}

			{#if title || description}
				<Separator class="-mx-5" />
			{/if}

			{#if content}
				{@render content({ openDialog, closeDialog })}
			{/if}

			{#if children}
				{@render children({ openDialog, closeDialog })}
			{/if}

			{#if footer}
				<Separator class="-mx-5" />
				<div class="mt-4 flex w-full justify-end">
					{@render footer({ openDialog, closeDialog })}
				</div>
			{/if}

			{#if showClose}
				<Dialog.Close
					class="focus-visible:ring-foreground focus-visible:ring-offset-background absolute top-5 right-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[0.98]"
				>
					<div>
						<X class="text-foreground size-5" />
						<span class="sr-only">Close</span>
					</div>
				</Dialog.Close>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
