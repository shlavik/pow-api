<script>
	import { Label } from 'bits-ui'
	import Button from '$lib/components/ui/Button.svelte'

	let { editableContext = $bindable(), closeDialog } = $props()

	let editableTitle = $state('')
	let editableDescription = $state('')

	$effect(() => {
		if (editableContext) {
			editableTitle = editableContext.title
			editableDescription = editableContext.description
		}
	})

	function saveContext() {
		if (editableContext) {
			editableContext.title = editableTitle
			editableContext.description = editableDescription
		}
		closeDialog()
	}

	function discardChanges() {
		closeDialog()
	}
</script>

<div class="p-1">
	<div class="mb-6">
		<h2 class="mb-2 text-2xl font-semibold">{editableTitle}</h2>
		<p class="text-foreground-alt text-base">
			Please provide a high-level summary of the project to establish the foundation for content
			creation.
		</p>
	</div>

	<div class="mb-6">
		<Label.Root for="context-description" class="mb-2 block text-sm font-medium"
			>Description</Label.Root
		>
		<textarea
			id="context-description"
			class="border-border-input bg-background focus:border-dark min-h-[200px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
			bind:value={editableDescription}
			placeholder="Enter a description..."
		></textarea>
	</div>

	<div class="flex space-x-4">
		<Button variant="outline" onclick={discardChanges}>Discard</Button>
		<Button variant="accent" onclick={saveContext}>Save context</Button>
	</div>
</div>
