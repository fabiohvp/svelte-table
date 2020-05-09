<script context="module">
  let globalLabels;

  export function setLabels(labels) {
    globalLabels = labels;
  }
</script>

<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let dir = "none";
  export let key;
  export let labels = {
    asc: { title: "Ascending", html: "&#8593;" },
    desc: { title: "Desceding", html: "&#8595;" },
    unsorted: { title: "Unsorted", html: "&#8645;" },
    ...globalLabels
  };

  function onClick(e) {
    const detail = { originalEvent: e, key, dir: "asc" };

    if (dir !== "desc") {
      detail.dir = "desc";
    }

    dispatch("sort", detail);

    if (detail.preventDefault !== false) {
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
    <span title={labels.asc.title}>
      {@html labels.asc.html}
    </span>
  {:else if dir === 'desc'}
    <span title={labels.desc.title}>
      {@html labels.desc.html}
    </span>
  {:else}
    <span title={labels.unsorted.title}>
      {@html labels.unsorted.html}
    </span>
  {/if}
</span>
