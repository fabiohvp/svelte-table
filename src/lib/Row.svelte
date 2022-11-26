<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let index = 0;

	function onClick(event: MouseEvent) {
		dispatch('click', event);
	}
</script>

<tr
	on:click={onClick}
	class={$$props.class}
	class:odd={index % 2 !== 0}
	class:even={index % 2 === 0}
>
	<slot />
</tr>

<style>
	.odd {
		background-color: #f7f7f7;
	}
</style>
