<script context="module">
  import Pagination, {
    setLabels as _setPaginationLabels
  } from "./Pagination.svelte";
  import Row from "./Row.svelte";
  import Search, { setLabels as _setSearchLabels } from "./Search.svelte";
  import Sort, { setLabels as _setSortLabels } from "./Sort.svelte";
  export { Pagination, Row, Search, Sort };

  let globalLabels;

  export function setTableLabels(labels) {
    globalLabels = labels;
  }

  export const setPaginationLabels = _setPaginationLabels;
  export const setSearchLabels = _setSearchLabels;
  export const setSortLabels = _setSortLabels;
</script>

<script>
  export let loading = false;
  export let page = 0;
  export let pageSize = 10;
  export let rows;
  export let labels = {
    empty: "No records available",
    loading: "Loading data",
    ...globalLabels
  };

  let filteredRows;
  let visibleRows;
  let pageCount = 0;
  let buttons = [-2, -1, 0, 1, 2];

  $: filteredRows = rows;
  $: currentFirstItemIndex = page * pageSize;
  $: visibleRows = filteredRows.slice(
    currentFirstItemIndex,
    currentFirstItemIndex + pageSize
  );

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

  .center {
    text-align: center;
    font-style: italic;
  }

  .center > span {
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
    {#if loading}
      <tr>
        <td class="center" colspan="100%">
          <span>{labels.loading}</span>
        </td>
      </tr>
    {:else if visibleRows.length === 0}
      <tr>
        <td class="center" colspan="100%">
          <span>{labels.empty}</span>
        </td>
      </tr>
    {:else}
      <slot rows={visibleRows} />
    {/if}
    <slot name="foot" />
  </table>
</div>

<div>
  <slot name="bottom">
    <Pagination
      {page}
      {pageSize}
      count={filteredRows.length - 1}
      on:change={onPageChange} />
  </slot>
</div>
