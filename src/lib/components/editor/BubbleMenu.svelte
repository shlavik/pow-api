<script lang="ts">
	import { BubbleMenu, type Editor } from 'svelte-tiptap'

	import Button from '$lib/components/ui/Button.svelte'

	let { editor }: { editor: Editor } = $props()

	const activeColor = 'text-amber-600'

	function getActiveColor(mark: string) {
		return editor.isActive(mark) ? activeColor : ''
	}
</script>

{#if editor}
	<BubbleMenu {editor}>
		<div class="bubble-menu">
			<Button
				class={getActiveColor('bold')}
				onclick={() => editor.chain().focus().toggleBold().run()}
			>
				B
			</Button>
			<Button
				class={getActiveColor('italic')}
				onclick={() => editor.chain().focus().toggleItalic().run()}
			>
				I
			</Button>
			<Button
				class={getActiveColor('strike')}
				onclick={() => editor.chain().focus().toggleStrike().run()}
			>
				S
			</Button>
		</div>
	</BubbleMenu>
{/if}
