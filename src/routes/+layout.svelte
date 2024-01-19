<script>
    import '$lib/base.css'
    import { navigating } from '$app/stores'
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
</script>

{#if $navigating}
	<div class="lds-hourglass" transition:fade />
{/if}

<div class="{$page.data.session.settings.theme}-mode theme-container">
	<header>
		<div>
			<img src="/icon/white.svg" alt="ocular" />
			<a href="/">
				<h1>ocular <span class="tag">redux</span></h1>
			</a>
			<nav>
				<a href="/search">search</a>
				<a href="https://github.com/jeffalo/ocular">github</a>
				<a href="/about">about</a>
				{#if $page.data.session.authenticated}
					<span class="authenticated-links">
						<a href="/user/{$page.data.session.user.username}">@{$page.data.session.user.username}</a>
						<a href="/dashboard">dashboard</a>
						<a
							href="/auth/logout"
							on:click|preventDefault={() => {
								let sure = confirm('Are you sure that you want to log out?');
								if (sure) {
									goto('/auth/logout');
								}
							}}>logout</a
						>
					</span>
				{:else}
					<a href="/login">login</a>
				{/if}
			</nav>
		</div>
	</header>

	<main>
		<slot />
		<footer>
			ocular is an open source project, with styling aspects inspired by
			<a href="https://scratch.mit.edu/users/maximouse">@Maximouse</a>
			and the Sratch Foundation<br />
			API and data from
			<a href="https://scratchdb.lefty.one/">@DatOneLefty</a>
			| Authentication API from
			<a href="https://auth.itinerary.eu.org/">@Looky1173</a>
			<br /><br />This community made tool falls under Creative Commons Attribution-ShareAlike 2.0
			license.<br /><br />
			<a href="/docs/privacy">Privacy</a>
			|
			<a href="/dashboard">Themes</a>
		</footer>
	</main>
</div>

<style>
	h1 {
		display: inline-block;
	}

	header {
		background-color: var(--brand);
		color: white;
		padding: 2rem;
		margin: 0 0 15px;
	}

	header div {
		max-width: 1200px;
		margin: 0 auto;
	}

	header a {
		color: white;
		/* text-decoration: none; */
	}

	.authenticated-links {
		float: right;
	}

	footer {
		color: var(--footer-text);
		padding-top: 10px;
		margin-top: 30px;
		padding-bottom: 10px;
	}

	footer a,
	button {
		font-weight: 700;
		background: none;
		border: none;
		border-radius: 0;
		padding: 0;
		margin: 0;
		line-height: normal;
		cursor: pointer;
		color: var(--footer-text);
	}

	.tag {
		border-radius: 4px;
		padding: 2px;
		font-size: small;
		font-weight: normal;
		font-family: monospace;
		background-color: var(--background);
		color: var(--text);
	}

	.tag::before {
		content: '[';
	}

	.tag::after {
		content: ']';
	}

	.lds-hourglass {
		display: inline-block;
		position: absolute;
		right: 10px;
		top: 10px;
		width: 50px;
		height: 35px;
	}

	.lds-hourglass:after {
		content: ' ';
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		margin: 8px;
		box-sizing: border-box;
		border: 15px solid white;
		border-color: white transparent white transparent;
		animation: lds-hourglass 1.25s infinite;
	}

	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}
</style>
