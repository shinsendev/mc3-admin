<script context="module">
	export async function preload(page, session) {
		const { MC3_API_URL } = session;
		return { mc3Url: MC3_API_URL };
	}
</script>

<script>
	export let mc3Url;
	import {connected, mc3} from "../store.js";
	mc3.set(mc3Url);

	import Login from "../components/Login.svelte";
	import Admin from "../components/Admin.svelte";
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{#if $connected === false}
	<Login/>
{:else}
	<Admin/>
{/if}
