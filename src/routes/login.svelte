<script>
	import { page } from '$app/stores';
	const error = $page.url.searchParams.get('error');

	// TODO: remove error from query string, so it doesn't appear in the URL and wont show on reload
</script>

<h2>login with scratch</h2>
<!-- if there is an error query parameter, show a message -->
{#if error}
	<p>{error}</p>
{/if}
<a href="/auth/begin">login</a>
