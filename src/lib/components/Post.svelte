<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';

	export let post;
	export let blockPreferenceOverride = false;

	import Status from '$lib/components/Status.svelte';
	import timeFormat from '$lib/time.js';

	let scratchblocksModule = null;

	async function blockify(content) {
		if (!browser || !window) return content;
		if (!scratchblocksModule)
			scratchblocksModule = await import('scratchblocks/build/scratchblocks.min.es');

		const scratchblocks = scratchblocksModule.default;

		let blockPreference = $session.settings?.blocks || '2.0'; // can be 2.0 or 3.0
		if (blockPreferenceOverride) {
			blockPreference = blockPreferenceOverride;
		}

		let options = {
			style: blockPreference == '3.0' ? 'scratch3' : 'scratch2',
			inline: false,
			scale: blockPreference == '3.0' ? 0.7 : 1,
			languages: ['en'],
			read: scratchblocks.read,
			parse: scratchblocks.parse,
			render: scratchblocks.render
		};
		const parser = new DOMParser();
		const doc = parser.parseFromString(content, 'text/html');
		let results = [].slice.apply(doc.querySelectorAll('pre.blocks:not(.scratchblockrendered)'));
		results.forEach(function (el) {
			var code = options.read(el, options);
			var parsed = options.parse(code, options);
			var svg = options.render(parsed, options);
			var container = doc.createElement('div');
			container.className = 'scratchblocks';
			container.appendChild(svg);
			el.innerHTML = '';
			el.appendChild(container);
		});
		return doc.documentElement.innerHTML;
	}

	let blockifiedContent = post.content.html;

	$: blockify(post.content.html).then((content) => (blockifiedContent = content));
</script>

<div class="post">
	<div class="header">
		<!-- {post.id} -->
		<a href="/post/{post.id}">{timeFormat(post.time.posted)}</a>
		<a href="/topic/{post.topic.id}">{post.topic.title}</a>
		<a class="view-on" href="https://scratch.mit.edu/discuss/post/{post.id}">view on scratch</a>
		<a class="view-on" href="https://ocular.jeffalo.net/post/{post.id}">view on legacy ocular</a>
	</div>
	<div class="main-container">
		<div class="peoplebox">
			<a href="/user/{post.username}">
				<span class="username">{post.username}</span>
				<img src="/api/picture/{post.username}" width="90" height="90" alt={post.username} />
			</a>
			<Status user={post.username} />
		</div>
		<div class="content-container">
			<div class="content">
				{@html blockifiedContent}
			</div>
			<div class="footer">
				<a href="https://scratch.mit.edu/discuss/misc/?action=report&post_id={post.id}">Report</a>
			</div>
		</div>
	</div>
</div>

<style>
	.post {
		margin-bottom: 20px;
	}

	.main-container {
		display: flex;
		flex-direction: row;
		border: 1px solid var(--sidebar-border);
		border-left: none;
	}

	.peoplebox {
		width: 20%;
		flex: 0 0 auto;
		background: var(--sidebar-background);
	}

	.peoplebox a {
		text-decoration: none;
		display: block;
		margin-bottom: 10px;
	}

	.peoplebox img {
		display: block;
		width: 90px;
		height: 90px;
	}

	@media only screen and (max-width: 750px) {
		.peoplebox img {
			width: 75%;
			height: auto;
		}
	}

	.peoplebox .username {
		color: var(--text);
		font-weight: 700;
		padding-bottom: 5px;
		display: block;
	}

	.peoplebox,
	.content-container {
		padding: 0.75em 1em;
		box-shadow: inset 1px 0 var(--sidebar-border);
		overflow-wrap: break-word;
		display: flex;
		flex-direction: column;
	}

	.content {
		margin-bottom: auto;
	}

	.content-container {
		width: 100%;
		overflow: hidden;
	}

	.header {
		background-color: var(--brand);
		padding: 10px;
		font-weight: bold;
		color: white;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		overflow: hidden;
		white-space: nowrap;
	}

	.header a {
		color: white;
	}

	.footer {
		line-height: 28px;
		padding-top: 2em;
		align-self: flex-end;
		text-align: right;
		display: block;
		width: 100%;
	}

	.view-on {
		float: right;
		margin-left: 2px;
		margin-right: 2px;
	}

	/* styling for post content */
	:global(.content img) {
		max-width: 100%;
		max-height: 100%;
	}

	:global(.content blockquote) {
		margin: 12px 0;
		padding: 12px 20px;
		border-style: solid;
		border-width: 1px;
		border-color: var(--quote-border);
		background-color: var(--quote-background);
	}

	:global(.content .code) {
		margin: 12px 0;
		padding: 12px 20px;
		border-style: solid;
		border-width: 1px;
		border-color: var(--quote-border);
		background-color: var(--quote-background);
		overflow: auto;
		max-height: 450px;
	}

	:global(.content .code pre) {
		margin: 0;
	}

	:global(.content .bb-quote-author) {
		color: var(--text-color);
		font-weight: bold;
	}

	:global(.content .bb-italic) {
		font-style: italic;
	}

	:global(.content .bb-bold) {
		font-weight: bold;
	}

	:global(.content .bb-small) {
		font-size: 10px;
	}

	:global(.content .bb-big) {
		font-size: 17px;
	}

	:global(.content .bb-strikethrough) {
		text-decoration: line-through;
	}

	:global(.content .bb-underline) {
		text-decoration: underline;
	}
</style>
