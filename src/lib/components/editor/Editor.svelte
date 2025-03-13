<script lang="ts">
	import Color from '@tiptap/extension-color'
	import Focus from '@tiptap/extension-focus'
	import Highlight from '@tiptap/extension-highlight'
	import Image from '@tiptap/extension-image'
	import Link from '@tiptap/extension-link'
	import Placeholder from '@tiptap/extension-placeholder'
	import Subscript from '@tiptap/extension-subscript'
	import Superscript from '@tiptap/extension-superscript'
	import TaskItem from '@tiptap/extension-task-item'
	import TaskList from '@tiptap/extension-task-list'
	import TextAlign from '@tiptap/extension-text-align'
	import TextStyle from '@tiptap/extension-text-style'
	import Underline from '@tiptap/extension-underline'
	import StarterKit from '@tiptap/starter-kit'
	import { onMount } from 'svelte'
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap'
	import type { Readable } from 'svelte/store'
	import { Markdown } from 'tiptap-markdown'

	import CustomTable from './table'
	import BubbleMenu from './BubbleMenu.svelte'

	let { markdown = $bindable('') } = $props()

	let editor = $state() as Readable<Editor>

	onMount(() => {
		editor = createEditor({
			content: markdown,
			extensions: [
				StarterKit,
				Placeholder,
				Color,
				Focus,
				Image,
				Link,
				Subscript,
				Superscript,
				TaskItem,
				TaskList,
				TextAlign,
				TextStyle,
				Underline,
				Highlight.configure({ multicolor: true }),
				Markdown,
				CustomTable.Table,
				CustomTable.TableCell,
				CustomTable.TableHeader,
				CustomTable.TableRow,
			],
			onUpdate: ({ editor, transaction }) => {
				markdown = editor.storage.markdown.getMarkdown()
			},
			editorProps: {
				attributes: {
					class: 'card-body form-control h-100',
				},
			},
		})
	})
</script>

<editor>
	<BubbleMenu editor={$editor} />
	<EditorContent editor={$editor} />
</editor>

<style>
	editor :global(.tiptap p.is-editor-empty:last-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
</style>
