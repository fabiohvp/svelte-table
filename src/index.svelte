<script context="module">
  import Pagination from "./Pagination.svelte";
  import Row from "./Row.svelte";
  import Search from "./Search.svelte";
  export { Pagination, Row, Search };
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

  function onPageChange(event) {
    page = event.detail;
  }

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
  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table :global(th, td) {
    position: relative;
  }

  .table :global(td) {
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
  <table class={'table ' + $$props.class}>
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
  <Pagination {page} {pages} on:change={onPageChange} />
</div>

<div>
  <slot name="bottom" />
</div>
