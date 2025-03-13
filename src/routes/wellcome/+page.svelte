<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte'
	import Dialog from '$lib/components/ui/Dialog.svelte'

	import ContextOptions from './ContextOptions.svelte'
	import ContextEditor from './ContextEditor.svelte'
	import ArticleInstructions from './ArticleInstructions.svelte'

	let editableContext = $state()
	let contextEditorDialog: Dialog | null = $state(null)
	let articleInstructionsDialog: Dialog | null = $state(null)

	$effect(() => {
		if (contextEditorDialog && editableContext) contextEditorDialog.openDialog()
	})
</script>

<div class="flex min-h-screen flex-col">
	<header class="flex w-full items-center justify-between border-b px-6 py-4">
		<div class="flex items-center">
			<img src="/favicon.png" alt="Logo" class="h-8 w-8" />
			<span class="ml-2 text-xl font-semibold">POW</span>
		</div>

		<div class="space-x-4">
			<Button variant="ghost">Copy</Button>
			<Button variant="ghost">Export</Button>
		</div>
	</header>

	<main class="flex flex-1 flex-col items-center justify-center px-4 text-center">
		<h1 class="mb-4 text-4xl font-bold">
			Hey! Today is a good day to write your best Web3 article
		</h1>
		<p class="mb-8 max-w-md text-lg text-gray-600">
			It is easy as 1-2-3. Provide context about your project, product or brand to make your article
			more tailored. Specify article writing instructions and hit generate!
		</p>

		<Dialog
			class="max-w-4xl"
			size="lg"
			title="Please provide context for your project"
			description="To write a better article please share context about your project"
		>
			{#snippet trigger()}
				<Button variant="accent">Let's start!</Button>
			{/snippet}

			{#snippet content({ closeDialog })}
				<ContextOptions bind:editableContext {closeDialog} />
			{/snippet}

			{#snippet footer({ closeDialog })}
				<div class="flex w-full justify-between">
					<Button variant="outline" onclick={closeDialog}>Cancel</Button>
					<Button
						variant="accent"
						onclick={() => (closeDialog(), articleInstructionsDialog?.openDialog())}
						>Skip and add later</Button
					>
				</div>
			{/snippet}
		</Dialog>

		<Dialog class="max-w-4xl" size="lg" bind:this={contextEditorDialog}>
			{#snippet content({ closeDialog })}
				<ContextEditor bind:editableContext {closeDialog} />
			{/snippet}
		</Dialog>

		<Dialog class="max-w-4xl" size="lg" bind:this={articleInstructionsDialog}>
			{#snippet content({ closeDialog })}
				<ArticleInstructions {closeDialog} />
			{/snippet}
		</Dialog>
	</main>
</div>
