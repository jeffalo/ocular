<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	import fetchWithTimeout from '$lib/fetch.js';
	export async function load({ fetch, url, params }) {
		const id = params.id;

		try {
			const post = await fetchWithTimeout(`https://scratchdb.lefty.one/v3/forum/post/info/${id}`, {
				timeout: 5000
			}).then((res) => res.json());

			if (post.error) {
				return {
					status: 500,
					error: post.error
				};
			}

			return {
				status: 200,
				props: {
					post,
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
	import Post from '$lib/components/Post.svelte';

	export let post;
</script>

<Post {post} />
