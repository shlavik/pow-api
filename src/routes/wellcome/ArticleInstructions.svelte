<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte'
	import Select from '$lib/components/ui/Select.svelte'
	import InfoCircle from 'phosphor-svelte/lib/Info'
	import { twMerge } from 'tailwind-merge'

	let { closeDialog } = $props()

	const toneOptions = [
		{ id: 'professional', label: 'Professional' },
		{ id: 'informative', label: 'Informative' },
		{ id: 'friendly', label: 'Friendly' },
		{ id: 'technical', label: 'Technical' },
		{ id: 'casual', label: 'Casual' },
		{ id: 'enthusiastic', label: 'Enthusiastic' },
	]

	const articleTypes = [
		{ value: 'overview', label: 'Project Overview' },
		{ value: 'tutorial', label: 'Tutorial' },
		{ value: 'announcement', label: 'Announcement' },
		{ value: 'deepdive', label: 'Technical Deep Dive' },
		{ value: 'comparison', label: 'Comparison' },
	]

	const languages = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
		{ value: 'de', label: 'German' },
		{ value: 'zh', label: 'Chinese' },
	]

	let topic = $state('')
	let articleType = $state('overview')
	let toneOfVoice = $state<string[]>(['professional', 'informative'])
	let articleLength = $state('medium')
	let language = $state('en')
	let additionalInstructions = $state('')

	function toggleTone(toneId: string) {
		if (toneOfVoice.includes(toneId)) {
			toneOfVoice = toneOfVoice.filter((t) => t !== toneId)
		} else {
			toneOfVoice = [...toneOfVoice, toneId]
		}
	}

	function handleSubmit() {
		let temp = {
			topic,
			articleType,
			toneOfVoice,
			articleLength,
			language,
			additionalInstructions,
		}
		closeDialog()
	}

	function handleArticleTypeChange(value: string | string[]) {
		if (typeof value === 'string') {
			articleType = value
		}
	}

	function handleLanguageChange(value: string | string[]) {
		if (typeof value === 'string') {
			language = value
		}
	}

	const inputClass =
		'w-full rounded-md border border-border-input bg-background p-2 focus:border-primary focus:outline-none h-input'
	const labelClass = 'mb-2 block font-medium'
</script>

<div class="p-6">
	<div class="mb-6">
		<h2 class="text-2xl font-bold">Please provide article writing instructions</h2>
		<p class="text-foreground-alt">
			Provide instructions to create an article that fits your needs better
		</p>
	</div>

	<hr class="border-muted mb-6" />

	<form onsubmit={handleSubmit}>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div>
				<label for="topic" class={labelClass}>
					Article Topic <span class="text-destructive">*</span>
				</label>
				<input type="text" id="topic" bind:value={topic} class={inputClass} />
			</div>

			<div>
				<label for="articleType" class={labelClass}>
					Article Type <span class="text-destructive">*</span>
				</label>
				<Select
					items={articleTypes}
					value={articleType}
					onValueChange={handleArticleTypeChange}
					placeholder="Select article type"
					class="w-full"
				/>
			</div>

			<div class="row-span-2">
				<label class={labelClass}>
					Tone of Voice <span class="text-destructive">*</span>
				</label>
				<div class="flex flex-wrap gap-2">
					{#each toneOptions as tone}
						<button
							type="button"
							class={twMerge(
								'rounded-full border px-3 py-1 text-sm',
								toneOfVoice.includes(tone.id)
									? 'border-primary bg-primary/10 text-primary'
									: 'border-border-input hover:bg-muted'
							)}
							onclick={() => toggleTone(tone.id)}
						>
							{tone.label}
						</button>
					{/each}
				</div>
			</div>

			<div>
				<label class={labelClass}>
					Article Length
					<button
						type="button"
						class="text-foreground-alt hover:text-foreground ml-1 inline-flex"
						title="Short: ~500 words, Medium: ~1000 words, Long: ~1500+ words"
					>
						<InfoCircle size={16} />
					</button>
				</label>
				<div class="flex space-x-4">
					<label class="inline-flex items-center">
						<input
							type="radio"
							name="articleLength"
							value="short"
							bind:group={articleLength}
							class="text-primary focus:ring-primary"
						/>
						<span class="ml-2">Short</span>
					</label>
					<label class="inline-flex items-center">
						<input
							type="radio"
							name="articleLength"
							value="medium"
							bind:group={articleLength}
							class="text-primary focus:ring-primary"
						/>
						<span class="ml-2">Medium</span>
					</label>
					<label class="inline-flex items-center">
						<input
							type="radio"
							name="articleLength"
							value="long"
							bind:group={articleLength}
							class="text-primary focus:ring-primary"
						/>
						<span class="ml-2">Long</span>
					</label>
				</div>
			</div>

			<div>
				<label for="language" class={labelClass}>
					Language <span class="text-destructive">*</span>
				</label>
				<Select
					items={languages}
					value={language}
					onValueChange={handleLanguageChange}
					placeholder="Select language"
					class="w-full"
				/>
			</div>
		</div>

		<div class="mt-8 flex justify-between">
			<Button type="button" variant="outline" onclick={closeDialog}>Back</Button>
			<Button type="submit" variant="accent">Generate</Button>
		</div>
	</form>
</div>
