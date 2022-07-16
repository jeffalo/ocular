<script>
	import { goto } from '$app/navigation';

	export let query = '';
	export let sort = 'relevance';
	export let searchInput;
</script>

<form
	method="get"
	action="/search"
	on:submit|preventDefault={(e) => {
		let formData = new FormData(e.target);
		let search = new URLSearchParams(formData);
		let queryString = search.toString();
		goto('/search?' + queryString);
	}}
>
	<input
		value={query}
		required="required"
		name="q"
		type="text"
		placeholder="search query"
		bind:this={searchInput}
	/>
	<select name="sort">
		<option value="relevance" selected={sort == 'relevance' || !sort} default>relevance</option>
		<option value="newest" selected={sort == 'newest'}>newest</option>
		<option value="oldest" selected={sort == 'oldest'}>oldest</option>
	</select>
	<button type="submit" class="form-button">go</button>
</form>

<style>
	form {
		display: flex;
		width: 100%;
	}

	input {
		flex-shrink: 0;
		flex-grow: 1;
	}
</style>
