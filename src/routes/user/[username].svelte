<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	import fetchWithTimeout from '$lib/fetch.js';
	export async function load({ fetch, url, params }) {
		const pageNumber = parseInt(url.searchParams.get('page')) || 1; // this is the pageNumber in human form, so we should substract 1 whenever talking to scratchdb
		const username = params.username;

		try {
			const user = await fetchWithTimeout(
				`https://scratchdb.lefty.one/v3/forum/user/info/${username}`,
				{
					timeout: 5000
				}
			).then((res) => res.json());

			if (user.error) {
				return {
					status: 500,
					error: user.error
				};
			}

			const posts = await fetchWithTimeout(
				`https://scratchdb.lefty.one/v3/forum/user/posts/${username}/${
					pageNumber - 1
				}?o=newest&filter=1`,
				{
					timeout: 5000
				}
			).then((res) => res.json());

			if (posts.error) {
				return {
					status: 500,
					error: posts.error
				};
			}

			return {
				status: 200,
				props: {
					posts,
					user,
					hits: user.counts.total.count,
					pageNumber,
					username
				}
			};
		} catch (error) {
			return {
				status: 500,
				error
			};
		}
	}
</script>

<script>
	import Pagination from '$lib/components/Pagination.svelte';
	import Post from '$lib/components/Post.svelte';

	export let posts;
	export let user;
	export let hits;
	export let username;

	export let pageNumber;

	$: capitalizedUsername = posts[0]?.username || username; // take the correct capitalization of the name from one of the posts (otherwise it would be just whatever is in the url)
</script>

{#if hits == 10000}
	<div class="alert warn">
		Your query resulted in over 10 thousand posts. You may have difficulty loading posts after page
		200.
	</div>
{/if}

<h2>{capitalizedUsername}</h2>
<p>
	posts:
	<b
		title={user.counts.total.count == 2
			? `If I got a nickel every time ${capitalizedUsername} posted, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice.`
			: `If I got a nickel every time ${capitalizedUsername} posted, I'd have $${(
					user.counts.total.count * 0.05
			  ).toFixed(2)}`}
	>
		{user.counts.total.count}
	</b>
</p>

<Pagination
	currentPageNumber={pageNumber}
	total={hits}
	linkBase="/user/{username}"
	unlimited={hits == 10000 || true}
/>

{#each posts as post (post.id)}
	<Post {post} />
{/each}

<Pagination
	currentPageNumber={pageNumber}
	total={hits}
	linkBase="/user/{username}"
	unlimited={hits == 10000 || true}
/>
