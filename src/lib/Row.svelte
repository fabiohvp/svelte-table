<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { RowEventArgs } from './interfaces';
	const dispatch = createEventDispatcher();

	export let index = 0;

	function onClick(event: MouseEvent) {
		const detail: RowEventArgs = {
			originalEvent: event,
			index
		};
		dispatch('click', detail);
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
		background-color: #fbfbfb;
	}
</style>
