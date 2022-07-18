<script context="module">
	export async function load({ session }) {
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {};
	}
</script>

<script>
	import Status from '$lib/components/Status.svelte';
	import Post from '$lib/components/Post.svelte';
	import { session } from '$app/stores';
	import { error, success } from '$lib/toaster';
	import themes from '$lib/themes.js';

	let settingsForm;
	let selectedBlockPreference = $session.settings.blocks;

	async function updateSettings(event) {
		// const form = event.target;
		const form = settingsForm;
		const data = new FormData(form);
		const settings = {};
		for (const [key, value] of data.entries()) {
			if (value == 'true' || value == 'false') {
				settings[key] = value === 'true';
			} else {
				settings[key] = value;
			}
		}
		const response = await fetch('/api/settings', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(settings)
		}).then((response) => response.json());

		// set the new settings
		if (response.settings) {
			const { settings } = response;
			$session.settings = settings;
			selectedBlockPreference = settings.blocks;
			success('settings updated');
		} else {
			error('there was an error saving your settings: ' + response.error);
		}
	}

	let examplePost = {
		id: 5743199,
		username: 'Jeffalo',
		editor: null,
		deleted: 0,
		time: {
			posted: '2021-10-31T16:55:37.000Z',
			first_checked: '2021-10-31T16:57:20.000Z',
			html_last_checked: '2021-10-31T16:57:20.000Z',
			bbcode_last_checked: '2021-10-31T16:57:19.000Z',
			edited: null
		},
		content: {
			html: 'this is an example post!<br><br><pre class="blocks">when green flag clicked<br>say [i love ocular!]<br>ask [did you know: the ocular green comes from the 3.0 pen colour] and wait<br>set pen color to [#0fbd8c]<br>forever<br>turn cw (1) degrees<br>end</pre>',
			bb: null
		},
		parser: {
			version: 1,
			highest: 1
		},
		topic: {
			id: 446450,
			title: 'ocular - scratch forum info',
			category: 'Advanced Topics',
			closed: 0,
			deleted: 0,
			time: {
				first_checked: '2020-10-10T07:47:09.000Z',
				last_checked: '2021-10-31T16:35:32.000Z'
			}
		}
	};
</script>

<h2>Dashboard</h2>
<p class="description-text">
	Your ocular status is a short message and colour, which is displayed across ocular and other
	Scratch related sites.
</p>
<Status user={$session.user.username} editable="true" showPostCount={false} />

<form bind:this={settingsForm} on:submit|preventDefault={updateSettings}>
	<h3>Setttings</h3>
	<div class="settings-grid">
		<div>
			<p>Block type: {$session.settings.blocks}</p>
			<div id="3.0-option">
				<input
					type="radio"
					on:change={updateSettings}
					id="3.0"
					name="blocks"
					value="3.0"
					checked={$session.settings.blocks == '3.0'}
				/>
				<label for="3.0">
					<img src="/scratchblocks/3.0.svg" alt="3.0 scratchblocks" />
				</label>
			</div>

			<div id="2.0 option">
				<input
					type="radio"
					on:change={updateSettings}
					id="2.0"
					name="blocks"
					value="2.0"
					checked={$session.settings.blocks == '2.0'}
				/>
				<label for="2.0">
					<img src="/scratchblocks/2.0.svg" alt="2.0 scratchblocks" />
				</label>
			</div>
		</div>
		<div>
			<p>Theme: {$session.settings.theme}</p>
			<div class="themes light-mode">
				<!-- to make this work, set the parent container to light mode so that the default variables work ^ -->
				{#each themes as theme}
					<input
						type="radio"
						on:change={updateSettings}
						id="theme-{theme}"
						name="theme"
						value={theme}
						checked={$session.settings.theme == theme}
					/>
					<label for="theme-{theme}" class="{theme}-mode theme-block">
						{theme}
					</label>
				{/each}
			</div>
		</div>
		<div>
			<p>
				Show signatures by default
				<input type="hidden" name="showSignatures" value="false" />
				<!-- 
					
					^^^ this checkbox makes it so that showSignatures will either be true or false. otherwise it wouldn't be included by FormData at all.
					does it break the spec? probably
					is it cheating? probably
					do i want to add a special case for checkboxes in my FormData to JSON parsing? no. 

				-->
				<input
					type="checkbox"
					name="showSignatures"
					id="showSignatures"
					value="true"
					on:change={updateSettings}
					checked={$session.settings.showSignatures == true}
				/>
			</p>
		</div>
		<!-- <button type="submit">Submit</button> -->
	</div>
</form>

{#key $session.settings}
	<Post post={examplePost} blockPreferenceOverride={selectedBlockPreference} />
{/key}

<style>
	input[type='radio'] {
		position: absolute;
		z-index: 100;
		top: 1;
	}

	label {
		opacity: 0.4;
		cursor: pointer;
		transition: opacity 100ms;
	}

	input[type='radio']:checked + label {
		opacity: 1;
	}

	.settings-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 10px;
	}

	.theme-block {
		display: block;
		padding: 4px 20px;
		border-left: 4px var(--brand) solid;
		background-color: var(--background);
		color: var(--text);
	}

	.description-text {
		color: var(--footer-text);
	}
</style>
