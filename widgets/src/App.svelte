<script>

	import Button from "./Button.svelte"
	export let name;
</script>

<style>
	h1 {
		color: var(--color-base);
	}
</style>

<h1>Demo of Malz Widgets</h1>
<Button label={"Hello!"} href={"http://google.com"} isOpenedInNewWindow={true}/>