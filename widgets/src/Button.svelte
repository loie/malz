<style>
	.is-loading {

	}

	.is-primary {

	}

	.is-success {

	}

	.is-warning {

	}

	.is-danger {

	}

	.is-link {

	}

	.is-minimal {

	}

	.is-small {

	}

	.is-fullwidth {

	}

	.is-active {

	}

	.has-label {

	}

	.has-icon {

	}

	.has-only-icon {

	}
</style>

<script>
	import Icon from "./Icon.svelte";
	export let icon = null
	export let label = null;
	export let href = null;
	export let isOpenedInNewWindow = false;

	$: hasHref = href && href.length > 0;
	$: hasLabel = label && label.length > 0;
	$: hasIcon = !!icon;
	$: hasOnlyIcon = icon && (label === undefined || label.length === 0);
</script>

<a
	class="button"
	href={href}
	target={isOpenedInNewWindow ? "_target" : null}>

	{#if hasIcon}
		<Icon icon={icon} />
	{/if}
	{#if hasLabel}
		<span class="label">{ label }</span>
	{/if}
</a>