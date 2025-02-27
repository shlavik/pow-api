<script lang="ts">
	import { githubLight } from '@fsegurai/codemirror-theme-bundle'
	import { Crepe } from '@milkdown/crepe'
	import { onMount } from 'svelte'

	import '@milkdown/crepe/theme/common/style.css'
	import '@milkdown/crepe/theme/frame.css'

	let { markdown = $bindable('') } = $props()

	let root = $state(null)

	onMount(() => {
		const crepe = new Crepe({
			root,
			defaultValue: markdown,
			featureConfigs: {
				[Crepe.Feature.BlockEdit]: {},
				[Crepe.Feature.CodeMirror]: {
					theme: githubLight,
				},
				[Crepe.Feature.Cursor]: {
					color: 'orange',
				},
				[Crepe.Feature.Toolbar]: {},
				[Crepe.Feature.Placeholder]: {
					mode: 'doc',
					text: 'Type / to use slash command',
				},
			},
		})

		crepe.on((listnerManager) => {
			listnerManager.markdownUpdated((ctx, md, prevMd) => {
				markdown = md
			})
		})

		crepe.create()

		return () => {
			crepe.destroy()
		}
	})
</script>

<editor bind:this={root}></editor>

<style>
	editor :global(code) {
		color: #032f62 !important;
		background-color: var(--crepe-color-surface) !important;
	}

	editor :global(::selection) {
		background-color: #bbdfff !important;
	}
</style>
