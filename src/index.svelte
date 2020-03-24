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
  
  export let searchStyle = '';
  // theming variables:
  export let searchFloat = 'left';
  export let searchWidth = '100%';
  export let searchMarginBottom = '1em';
  export let style = '';
  
  export let loading = false;
  export let page = 0;
  export let pageSize = 10;
  export let responsive = true;
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
        String(row[i])
          .toLowerCase()
          .indexOf(text) > -1
      ) {
        return true;
      }
    }

    return false;
  }

  $: searchStyle = `
    --float:${searchFloat};
    --width:${searchWidth};
    --margin-bottom: ${searchMarginBottom};
    ${style}
  `;
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

  @media screen and (max-width: 767px) {
  table.responsive {
    border: 0;
  }

  table.responsive :global(thead) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table.responsive :global(tr) {
    border-bottom: 2px solid #ddd;
    display: block;
    padding-bottom: 0.3em;
    margin-bottom: 0.3em;
  }

  table.responsive :global(td) {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table.responsive :global(td::before) {
    /*
	* aria-label has no advantage, it won't be read inside a table content: attr(aria-label);
	*/
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  table.responsive :global(td[data-label-normal]::before) {
    font-weight: normal;
  }

  table.responsive :global(td[data-label-upper]::before) {
    text-transform: uppercase;
  }

  table.responsive :global(td:last-child) {
    border-bottom: 0;
  }
}
</style>

<slot name="top">
  <div style={searchStyle}>
    <Search on:search={onSearch} />
  </div>
</slot>

<table class={'table ' + $$props.class} class:responsive={responsive}>
  <slot name="head" />
  {#if loading}
	<tbody>
      <tr>
		<td class="center" colspan="100%">
			<span>
			{@html labels.loading}
			</span>
		</td>
      </tr>
	</tbody>
  {:else if visibleRows.length === 0}
	<tbody>
      <tr>
		<td class="center" colspan="100%">
			<span>
			{@html labels.empty}
			</span>
		</td>
      </tr>
	</tbody>
  {:else}
    <slot rows={visibleRows} />
  {/if}
  <slot name="foot" />
</table>

<slot name="bottom">
  <div style="float:left;width:100%;margin-top: 1em;">
    <Pagination
      {page}
      {pageSize}
      count={filteredRows.length - 1}
      on:change={onPageChange} />
  </div>
</slot>
