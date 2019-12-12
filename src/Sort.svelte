<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let dir;
  export let name;
  export let labels = {
    asc: "Ascending",
    desc: "Desceding",
    none: "Not sorted"
  };

  function onClick(e) {
    const detail = { originalEvent: e, name, dir: "asc" };

    if (!dir || dir === "asc") {
      detail.dir = "desc";
    }

    dispatch("click", detail);

    if (detail.returnValue !== false) {
      dir = detail.dir;
    }
  }
</script>

<style>
  .sort {
    right: 0;
    cursor: pointer;
    position: absolute;
    padding: 0 0.25em;
    color: #999;
  }
</style>

<span class="sort" on:click={onClick}>
  {#if dir === 'asc'}
    <span title={labels.asc}>&#8593;</span>
  {:else if dir === 'desc'}
    <span title={labels.desc}>&#8595;</span>
  {:else}
    <span title={labels.none}>&#8645;</span>
  {/if}
</span>
