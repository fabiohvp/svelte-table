<script context="module">
  import Row from "./Row.svelte";
  import Search from "./Search.svelte";
  export { Row, Search };
</script>

<script>
  export let page = 0;
  export let pageSize = 10;
  export let rows;

  let filteredRows;
  let visibleRows;
  let pages = 0;
  let buttons = [-2, -1, 0, 1, 2];

  $: filteredRows = rows;
  $: currentFirstItemIndex = page * pageSize;
  $: visibleRows = filteredRows.slice(
    currentFirstItemIndex,
    currentFirstItemIndex + pageSize
  );
  $: pages = Math.floor((filteredRows.length - 1) / pageSize);

  function onSearch(event) {
    page = 0;

    if (event.detail.length === 0) {
      filteredRows = rows;
    } else {
      filteredRows = rows.filter(r => filter(r, event.detail));
    }
  }

  function filter(row, text) {
    text = text.toLowerCase();
    for (let i in row) {
      if (
        row[i]
          .toString()
          .toLowerCase()
          .indexOf(text) > -1
      ) {
        return true;
      }
    }

    return false;
  }
</script>

<style>
  div {
    width: 100%;
    float: left;
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

  .active {
    background-color: rgb(150, 150, 235);
    color: white;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  :global(table td) {
    padding: 0.3em 0.3em;
  }

  .empty-message {
    text-align: center;
    font-style: italic;
  }

  .empty-message > span {
    padding: 10px 10px;
    float: left;
    width: 100%;
  }
</style>

<div>
  <slot name="top">
    <Search on:search={onSearch} />
  </slot>
</div>

<div>
  <table class={$$props.class}>
    <slot name="head" />
    <slot rows={visibleRows} />
    {#if visibleRows.length === 0}
      <tr>
        <td class="empty-message" colspan="100%">
          <span>Não há registros disponíveis</span>
        </td>
      </tr>
    {/if}
    <slot name="foot" />
  </table>
</div>
<div>
  <ul>
    <li>
      <button disabled={page === 0} on:click={() => (page = 0)}>
        Primeira
      </button>
    </li>
    <li>
      <button disabled={page === 0} on:click={() => page--}>Anterior</button>
    </li>
    {#each buttons as button}
      {#if page + button >= 0 && page + button <= pages}
        <li>
          <button
            class:active={page === page + button}
            on:click={() => (page = page + button)}>
            {page + button + 1}
          </button>
        </li>
      {/if}
    {/each}
    <li>
      <button disabled={page > pages - 1} on:click={() => page++}>
        Próxima
      </button>
    </li>
    <li>
      <button disabled={page >= pages} on:click={() => (page = pages)}>
        Última
      </button>
    </li>
  </ul>
</div>

<div>
  <slot name="bottom" />
</div>
