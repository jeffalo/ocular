<!-- a status is an ocular status + post count -->
<script>
	export let user;
	export let editable;
	export let showPostCount = true;

	import { error, success } from '$lib/toaster';
	import { statuses } from '$lib/stores.js';
	import { tick, onMount } from 'svelte';

	async function fetchStatus(username) {
		// simply return a promise that resolves to the my-ocular data of username
		return new Promise(async (resolve, reject) => {
			const ocular = await fetch(`/api/user/${username}`).then((r) => r.json());

			const userInfo = await fetch(
				`https://scratchdb.lefty.one/v3/forum/user/info/${username}`
			).then((r) => r.json());

			const data = {
				ocular,
				userInfo
			};

			resolve(data);
		});
	}

	async function getStatus(username) {
		// gets a user's status.
		// 1. check if $statuses has the user's status OR a promise that will resolve to the user's status
		// 2. if not, fetch the user's status from the API and add it to $statuses

		// 1.

		if ($statuses[username]) {
			//console.log(`${username} is in $statuses already`);
			return $statuses[username];
		}

		// 2.
		console.log(`${username} is being fetched`);

		const dataPromise = fetchStatus(username);
		$statuses[username] = dataPromise;

		return dataPromise;
	}

	let promise = new Promise(() => {}); // we will use this promise to show a loading indicator

	onMount(async () => {
		// only run this client side, because the server doesnt know how to fetch /api/
		promise = getStatus(user);
	});

	let editMode = false;
	let editModeLoading = false;

	let statusInput;
	let colorInput;

	const edit = async () => {
		if (!editMode) {
			editMode = true;
			await tick();
			resizeInput();
			statusInput.focus();
			return;
		}
		editModeLoading = true;
		let content = statusInput.value;
		let color = colorInput.value;
		if (content) {
			// send the new status to the API
			let response = await fetch(`/api/user/${user}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: content,
					color: color
				})
			}).then((r) => r.json());

			if (response.error) {
				error(response.error);
			} else {
				// remove the old status from $statuses and re-fetch the new status
				delete $statuses[user];
				// we dont want to have svelte show the loading text, so we can handle the promise ourselves
				let got = await getStatus(user);
				promise = new Promise(async (resolve, reject) => {
					resolve(got);
				});
				editMode = false;
				editModeLoading = false;
				success('status updated!');
			}
		}
	};

	function resizeInput() {
		statusInput.style.width = statusInput.value.length + 4 + 'ch';
	}
</script>

{#await promise}
	<p>loading</p>
{:then data}
	{#if showPostCount && data.userInfo && !data.userInfo.error}
		<span class="post-count">{data.userInfo.counts.total.count} posts</span>
	{/if}
	{#if data.ocular && !data.ocular.error}
		{#if editMode}
			<input
				class="status-input"
				type="text"
				maxlength="300"
				disabled={editModeLoading}
				value={data.ocular.status}
				bind:this={statusInput}
				on:input={resizeInput}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						edit();
					}
				}}
			/>
			<input
				class="color-input"
				type="color"
				disabled={editModeLoading}
				value={data.ocular.color}
				bind:this={colorInput}
			/>
		{:else}
			<span>{data.ocular.status}</span>
			<span class="status-color" style="background-color: {data.ocular.color}" />
		{/if}
	{/if}
	{#if editable}
		<button on:click={edit} class="edit-status">
			{editMode ? '💾' : '📝'}
		</button>
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	.post-count {
		display: block;
	}

	.status-color {
		height: 10px;
		width: 10px;
		margin-left: 3px;
		/* background-color: #207439; */
		border-radius: 50%;
		display: inline-block;
	}

	/* TODO: make look identical to the status text */
	/* .status-input {
  } */
</style>
