<script>
  //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
  //Sort component is optional
  import { onMount } from "svelte";
  import Table, { Pagination, Row, Search, Sort } from "./Table.svelte";
  import { getData } from "./server.js";
  import { sortNumber, sortString } from "./sorting.js";

  let rows = [];
  let page = 0; //first page
  let pageIndex = 0; //first row
  let pageSize = 3; //optional, 10 by default

  let loading = true;
  let rowsCount = 0;
  let text;
  let sorting;

  onMount(async () => {
    await load(page);
  });

  async function load(_page) {
    loading = true;
    const data = await getData(_page, pageSize, text, sorting);
    rows = data.rows;
    rowsCount = data.rowsCount;
    loading = false;
  }

  function onCellClick(row) {
    alert(JSON.stringify(row));
  }

  function onPageChange(event) {
    load(event.detail.page);
    page = event.detail.page;
  }

  async function onSearch(event) {
    text = event.detail.text;
    await load(page);
    page = 0;
  }

  async function onSort(event) {
    sorting = { dir: event.detail.dir, key: event.detail.key };
    await load(page);
  }
</script>

<Table {loading} {rows} {pageIndex} {pageSize} let:rows={rows2}>
  <div slot="top">
    <Search on:search={onSearch} />
  </div>
  <thead slot="head">
    <tr>
      <th>
        Name
        <Sort key="name" on:sort={onSort} />
      </th>
      <th>
        Lastname
        <Sort key="lastName" on:sort={onSort} />
      </th>
      <th>
        Age
        <Sort key="age" on:sort={onSort} />
      </th>
    </tr>
  </thead>
  <tbody>
    {#each rows2 as row, index (row)}
      <Row {index} on:click={() => onCellClick(row)}>
        <td data-label="Name">{row.name}</td>
        <td data-label="Lastname">{row.lastName}</td>
        <td data-label="Age">{row.age}</td>
      </Row>
    {/each}
  </tbody>
  <div slot="bottom">
    <Pagination
      {page}
      {pageSize}
      count={rowsCount}
      serverSide={true}
      on:pageChange={onPageChange} />
  </div>
</Table>
