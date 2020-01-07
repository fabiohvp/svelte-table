<script context="module">
  let globalLabels;

  export function setLabels(labels) {
    globalLabels = labels;
  }
</script>

<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let page;
  export let count;
  export let pageSize;
  export let buttons = [-2, -1, 0, 1, 2];

  export let labels = {
    first: "First",
    last: "Last",
    next: "Next",
    previous: "Previous",
    ...globalLabels
  };

  $: pageCount = Math.floor(count / pageSize);

  function onChange(page) {
    dispatch("change", page);
  }
</script>

<style>
  .active {
    background-color: rgb(150, 150, 235);
    color: white;
  }

  ul {
    flex: 1;
    float: right;
    list-style: none;
  }

  li {
    float: left;
  }

  button {
    padding: 5px 10px;
    margin-left: 3px;
    float: left;
    cursor: pointer;
  }
</style>

<ul>
  <li>
    <button disabled={page === 0} on:click={() => onChange(0)}>
      {labels.first}
    </button>
  </li>
  <li>
    <button disabled={page === 0} on:click={() => onChange(page - 1)}>
      {labels.previous}
    </button>
  </li>
  {#each buttons as button}
    {#if page + button >= 0 && page + button <= pageCount}
      <li>
        <button
          class:active={page === page + button}
          on:click={() => onChange(page + button)}>
          {page + button + 1}
        </button>
      </li>
    {/if}
  {/each}
  <li>
    <button disabled={page > pageCount - 1} on:click={() => onChange(page + 1)}>
      {labels.next}
    </button>
  </li>
  <li>
    <button disabled={page >= pageCount} on:click={() => onChange(pageCount)}>
      {labels.last}
    </button>
  </li>
</ul>
