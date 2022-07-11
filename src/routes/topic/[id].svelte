<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	import fetchWithTimeout from '$lib/fetch.js';
	export async function load({ fetch, url, params }) {
		const pageNumber = parseInt(url.searchParams.get('page')) || 1; // this is the pageNumber in human form, so we should substract 1 whenever talking to scratchdb
		const id = params.id;

		try {
			const topic = await fetchWithTimeout(
				`https://scratchdb.lefty.one/v3/forum/topic/info/${id}`,
				{
					timeout: 5000
				}
			).then((res) => res.json());

			if (topic.error) {
				return {
					status: 500,
					error: topic.error
				};
			}

			const posts = await fetchWithTimeout(
				`https://scratchdb.lefty.one/v3/forum/topic/posts/${id}/${pageNumber - 1}?o=oldest`,
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
					topic,
					hits: topic.post_count,
					pageNumber,
					id
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
	export let topic;
	export let hits;
	export let id;

	export let pageNumber;
</script>

{#if hits == 10000}
	<div class="alert warn">
		Your query resulted in over 10 thousand posts. You may have difficulty loading posts after page
		200.
	</div>
{/if}

<h2>{topic.title}</h2>
<p>id: <b>{topic.id}</b></p>
<p>category: <b>{topic.category}</b></p>
<p>
	posts: <b
		title={hits == 2
			? "If I got a nickel every time someone posted here, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice."
			: `If I got a nickel every time someone posted here, I'd have $${(hits * 0.05).toFixed(2)}`}
		>{hits}</b
	>
</p>

<Pagination
	currentPageNumber={pageNumber}
	total={hits}
	linkBase="/topic/{id}"
	unlimited={hits == 10000}
/>

{#each posts as post (post.id)}
	<Post {post} />
{/each}

<Pagination
	currentPageNumber={pageNumber}
	total={hits}
	linkBase="/topic/{id}"
	unlimited={hits == 10000}
/>
