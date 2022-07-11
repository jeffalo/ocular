<script>
	import { session, navigating } from '$app/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/env';
</script>

<SvelteToast />

{#if $navigating}
	<div class="lds-hourglass" transition:fade />
{/if}

<div class="{$session.settings.theme}-mode theme-container">
	<header>
		<div>
			<img src="/icon/white.svg" alt="ocular" />
			<a href="/">
				<h1>ocular rewritten</h1>
			</a>
			<nav>
				<a href="/">home</a>
				<a href="/search">search</a>
				<a href="/topic/446450">test topic</a>
				{#if $session.authenticated}
					{JSON.stringify($session.settings)}
					<a href="/user/{$session.user.username}">@{$session.user.username}</a>
					<a href="/dashboard">dashboard</a>
					<a href="/auth/logout">logout</a>
				{/if}
				<!-- <form method="get" action="/search">
					<input
						required="required"
						name="q"
						type="text"
						placeholder="search query"
					/>
					<select name="sort">
						<option value="relevance">relevance</option>
						<option value="newest">newest</option>
						<option value="oldest">oldest</option>
					</select>
					<button type="submit" class="form-button">go</button>
				</form> -->
			</nav>
		</div>
	</header>

	<main>
		<slot />
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
