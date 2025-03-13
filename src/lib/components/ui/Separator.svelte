<script module>
	import type { SeparatorRootProps } from 'bits-ui'

	export type SeparatorProps = SeparatorRootProps & {
		class?: string
	}
</script>

<script lang="ts">
	import { Separator } from 'bits-ui'
	import { twMerge } from 'tailwind-merge'

	let { class: className }: SeparatorProps = $props()
</script>

<Separator.Root class={twMerge('bg-border shrink-0:w-full my-4 h-px', className)} />
