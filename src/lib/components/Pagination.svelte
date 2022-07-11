<script>
	export let total;
	export let perPage = 50;
	export let currentPageNumber;
	export let unlimited = false;

	export let linkBase; // this would be like /topic/123

	$: questionMarkOrAmpersand = linkBase.includes('?') ? '&' : '?';
</script>

{#if total / perPage > 1}
	<a
		href="{linkBase}{questionMarkOrAmpersand}page={currentPageNumber - 1}"
		class:selected={currentPageNumber == 1}
	>
		‹‹ previous
	</a>
	<!-- this is already -1 -->

	<span>
		{#each Array.from({ length: Math.ceil(total / perPage) }, (_, i) => i + 1) as i}
			<a
				class="page"
				class:selected={i == currentPageNumber}
				href="{linkBase}{questionMarkOrAmpersand}page={i}">{i}</a
			>
		{/each}
	</span>

	{#if !Array.from({ length: Math.ceil(total / perPage) }, (_, i) => i + 1).includes(currentPageNumber)}
		<b class="selected">{currentPageNumber}</b>
	{/if}

	{#if unlimited}
		<span title="Inaccurate pagination">...</span>
	{/if}

	<a
		href="{linkBase}{questionMarkOrAmpersand}page={currentPageNumber + 1}"
		class:selected={currentPageNumber == Math.ceil(total / perPage) && !unlimited}
	>
		next ››
	</a>
{/if}

<!-- +2 because it starts at 0 -->
<style>
	span {
		overflow-wrap: break-word;
	}
	.page {
		margin-left: 4px;
		margin-right: 4px;
		display: inline-block;
	}

	.selected {
		color: inherit;
		text-decoration: inherit;
		pointer-events: none;
	}
</style>
