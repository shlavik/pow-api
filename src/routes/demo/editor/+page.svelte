<script lang="ts">
	import Tiptap from '$lib/components/editor/Editor.svelte'

	let markdown = $state(`# HEADER

* second
* first

> TEST

\`<div style="text-align: right"> your-text-here </div>\`\

| HEAD 1 | HEAD 2 | HEAD 3 |
| :----- | :----: | -----: |
| 1      | 2      | 3      |
| 1      | 2      | 3      |
`)
</script>

<main>
	<Tiptap bind:markdown />

	<hr />

	<pre>{markdown}</pre>
</main>
