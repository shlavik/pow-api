<script>
	import Plus from 'phosphor-svelte/lib/Plus'

	let { editableContext = $bindable(), closeDialog } = $props()

	let activeContextId = $state()

	let contextCards = $state([
		{
			id: 'project',
			title: 'Project overview',
			description:
				'Describe your project, its purpose, main features, and what sets it apart from others.',
		},
		{
			id: 'brand',
			title: 'Brand strategy',
			description:
				'Share your brand values, mission, vision, and the core message you want to communicate.',
		},
		{
			id: 'whitepaper',
			title: 'Whitepaper Summary',
			description: 'Provide a summary of your whitepaper or technical documentation.',
		},
		{
			id: 'audience',
			title: 'Target Audience & Personas',
			description:
				'Describe your target audience - who are they, what do they need, and how does your project help them?',
		},
		{
			id: 'product',
			title: 'Product Features',
			description: 'List the key features and benefits of your product or service.',
		},
	])

	let contextCardsMap = $derived(Object.groupBy(contextCards, ({ id }) => id))
</script>

<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
	{#each contextCards as card}
		<button
			type="button"
			class={`rounded-card-lg border-border-input border p-5 text-left transition-all ${
				activeContextId === card.id
					? 'border-dark ring-dark ring-opacity-20 ring-2'
					: 'hover:border-dark/30'
			}`}
			onclick={() => ((editableContext = card), closeDialog())}
		>
			<div class="flex items-start justify-between">
				<div>
					<h3 class="mb-1 flex items-center text-base font-medium">
						{card.title}
					</h3>
					<p class="text-foreground-alt mb-4 text-sm">{card.description}</p>
				</div>
			</div>

			<div class="text-dark hover:text-dark/80 inline-flex items-center text-sm font-medium">
				<Plus size={16} weight="bold" class="mr-1" />
				Add context
			</div>
		</button>
	{/each}

	<button
		type="button"
		class="rounded-card-lg border-border-input hover:border-dark/30 flex cursor-pointer items-center justify-center border border-dashed p-5"
	>
		<div class="text-dark flex flex-col items-center justify-center">
			<div class="bg-dark/10 mb-2 rounded-full p-3">
				<Plus size={24} weight="bold" class="text-dark" />
			</div>
			<span class="font-medium">Add custom context</span>
		</div>
	</button>
</div>
