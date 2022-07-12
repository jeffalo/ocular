<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	import fetchWithTimeout from '$lib/fetch.js';
	export async function load({ fetch, url }) {
		const query = url.searchParams.get('q') || '';
		const sort = url.searchParams.get('sort') || 'relevance';
		const pageNumber = parseInt(url.searchParams.get('page')) || 1; // this is the pageNumber in human form, so we should substract 1 whenever talking to scratchdb

		if (query) {
			const apiURL = `https://scratchdb.lefty.one/v3/forum/search?q=${encodeURIComponent(
				query
			)}&o=${encodeURIComponent(sort)}&page=${encodeURIComponent(
				pageNumber - 1
			)}&cache=${Date.now()}`; // TODO: don't do this.

			try {
				const response = await fetchWithTimeout(apiURL, {
					timeout: 5000
				});

				const data = await response.json();
				return {
					status: response.status,
					props: {
						type: 'results',
						posts: data.posts,
						hits: data.hits,
						query,
						sort,
						pageNumber
					}
				};
			} catch (error) {
				return {
					status: 500,
					error
				};
			}
		} else {
			return {
				props: {
					type: 'home',
					posts: [],
					hits: null,
					query: '',
					sort: '',
					pageNumber: null
				}
			};
		}
	}
</script>

<script>
	import Pagination from '$lib/components/Pagination.svelte';
	import Post from '$lib/components/Post.svelte';

	export let type;
	export let posts;
	export let hits;

	export let query;
	export let sort;
	export let pageNumber;
</script>

<form method="get">
	<input value={query} required="required" name="q" type="text" placeholder="search query" />
	<select name="sort">
		<option value="relevance" selected={sort == 'relevance' || !sort} default>relevance</option>
		<option value="newest" selected={sort == 'newest'}>newest</option>
		<option value="oldest" selected={sort == 'oldest'}>oldest</option>
	</select>
	<button type="submit" class="form-button">go</button>
</form>
{#if type == 'home'}
	some stuff would go here
{:else if type == 'error'}
	<p>error</p>
{:else}
	{#if hits == 10000}
		<div class="alert warn">
			Your query resulted in over 10 thousand posts. You may have difficulty loading posts after
			page 200.
		</div>
	{/if}
	<Pagination
		currentPageNumber={pageNumber}
		total={hits}
		linkBase="/search?q={encodeURIComponent(query)}&sort={encodeURIComponent(sort)}"
		unlimited={hits == 10000}
	/>
	{#each posts as post (post.id)}
		<Post {post} />
	{/each}
	<Pagination
		currentPageNumber={pageNumber}
		total={hits}
		linkBase="/search?q={encodeURIComponent(query)}&sort={encodeURIComponent(sort)}"
		unlimited={hits == 10000}
	/>
{/if}

<style>
	form {
		display: flex;
	}
</style>
