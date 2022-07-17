<script>
	export let user;
	import { statuses } from '$lib/stores.js';
	import { onMount } from 'svelte';

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
</script>

<div class="signature">
	<hr />
	{#await promise then data}
		{@html data.userInfo.signature}
	{/await}
</div>

<style>
	.signature {
		/* overflow-y: auto !important;
		resize: vertical;
		max-height: fit-content !important; */
		max-height: 168px;
	}
	hr {
		background-color: var(--quote-border);
	}

	hr {
		margin-left: 0;
		width: 200px;
		text-align: left;
		height: 1px;
		border: 0;
	}
</style>
