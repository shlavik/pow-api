<script lang="ts">
	import Editor from '$lib/components/Editor.svelte'

	let markdown = $state(`# HEADER

* second
* first

\`<div style="text-align: right"> your-text-here </div>\`

\`\`\`JavaScript
let a = 1;
let b = 2;
let c = a + b;
\`\`\`

\$\$
a + b = c
\$\$

| HEAD 1 | HEAD 2 | HEAD 3 |
| :----- | :----: | -----: |
| 1      | 2      | 3      |
| 1      | 2      | 3      |
`)
</script>

<main>
	<Editor bind:markdown />

	<hr />

	<pre>{markdown}</pre>
</main>
