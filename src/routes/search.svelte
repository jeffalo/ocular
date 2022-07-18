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
	import SearchForm from '$lib/components/SearchForm.svelte';

	export let type;
	export let posts;
	export let hits;

	export let query;
	export let sort;
	export let pageNumber;

	let searchInput;

	function addOperator(operator) {
		searchInput.value += `${searchInput.value.length == 0 ? '' : ' '}+${operator}:""`;
		searchInput.focus();
		searchInput.setSelectionRange(searchInput.value.length - 1, searchInput.value.length - 1);
	}
</script>

<h1>Scratch Forum Search</h1>
<SearchForm {query} {sort} bind:searchInput />

{#if type == 'home'}
	<h2>Search Parameters</h2>
	<p>
		ocular search is a frontend for <a href="https://scratchdb.lefty.one/">ScratchDB</a>. ScratchDB
		uses a query parser to support search operators. Each requirement is in the format
		+requirement:"value". If you don't include any operators, ScratchDB will perform a simple
		content search. Prefix an operator with + to require it to be true, - to require it to be false
		and ~ if it should be true, but is not required.
	</p>

	<table class="info">
		<thead>
			<tr>
				<th>Usage</th>
				<th>Results</th>
			</tr>
		</thead>
		<tbody>
			<tr
				on:click={() => {
					addOperator('content');
				}}
			>
				<td>+content:"appelmoeshapje"</td>
				<td>Requires that all results contain a certain string</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('username');
				}}
			>
				<td>+username:"Jeffalo"</td>
				<td>Requires that all results are posted by a certain user</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('status');
				}}
			>
				<td>+status:"Scratch Team"</td>
				<td>
					Requires that all results are posted by users of a specific Scratch rank. (New Scratcher,
					Scratcher, Scratch Team)
				</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('category');
				}}
			>
				<td>+category:"Advanced Topics"</td>
				<td>
					Requires that all results are posted in a certain subforum (This does not have to be
					complete, +category:"Things" will match posts in "Things I'm Making and Creating" and "
					Things I'm Reading and Playing")
				</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('topic');
				}}
			>
				<td>+topic:"446450"</td>
				<td>Requires that all results are posted in a certain topic by ID</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('title');
				}}
			>
				<td>+title:"ocular"</td>
				<td>Requires that all results are posted in a certain topic by title</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('closed');
				}}
			>
				<td>+closed:"0"</td>
				<td>
					Requires that all results are posted in a certain topic by closed status (0 is open, and 1
					is closed)
				</td>
			</tr>
			<tr
				on:click={() => {
					addOperator('id');
				}}
			>
				<td>+id:"5302781"</td>
				<td>Returns a single post by ID</td>
			</tr>
		</tbody>
	</table>
{:else if type == 'error'}
	<p>error</p>
{:else}
	{#if hits == 10000}
		<div class="alert warn">
			Your query resulted in over 10 thousand posts. You may have difficulty loading posts after
			page 200.
		</div>
	{/if}
	{#if hits == 0}
		<div class="no-results">
			<p>Your search - <b>{query}</b> - did not match any posts.</p>
			<ul>
				<li>Make sure that all words are spelled correctly.</li>
				<li>Try different keywords.</li>
				<li>Try more general keywords.</li>
				<li>Try fewer keywords.</li>
				<li><a href="/search">Search operators</a></li>
				<!-- :P -->
			</ul>
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
	.info {
		border-collapse: collapse;
		width: 100%;
		margin-top: 10px;
	}

	.info td,
	.info th {
		border: 1px solid var(--table-border);
		padding: 8px;
	}
	.info tr:nth-child(even) {
		background-color: var(--table-stripe);
		transition: 250ms;
	}
	.info tr:nth-child(odd) {
		background-color: var(--background);
		transition: 250ms;
	}
	.info tr:hover {
		background-color: var(--table-hover);
		cursor: pointer;
	}
	.info th {
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
		background-color: var(--brand);
		color: white;
	}

	.no-results {
		padding: 10px;
		border: 1px var(--input-border) dashed;
		border-radius: 5px;
	}
</style>
