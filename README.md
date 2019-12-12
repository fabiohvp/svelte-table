# Svelte-table

a simple way to render your tables, the purpose of this component is to be a reausable html table wrapper without needing to coding too much javascript.

`npm install @fabiohvp/svelte-table`  
or  
`yarn add @fabiohvp/svelte-table`

## Advanced

- You can add components to the top or bottom slots.
- Adding top/bottom slot will override the default content (Search/Pagination) but you can still use it by importing and adding them inside your custom slot.
- You can change the default search method by adding an on:search event on Search component.
- Row component is optional and only serves to render odd/even row, you can use &lt;tr> instead.
- Sort component expect "key" and you need to implement your own sorting method (see the example below).

[Full code sample (including source)](https://svelte.dev/repl/3238e5737f764431a26e243800dccc6d?version=3.16.4)

## Sample

```
<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
  import Table, { Row, Sort } from "./Table.svelte";

  let rows = [
    { name: "a", lastName: "o", age: 12 },
    { name: "b", lastName: "n", age: 1 },
    { name: "c", lastName: "m", age: 13 },
    { name: "d", lastName: "l", age: 21 },
    { name: "e", lastName: "k", age: 2 }
  ];

  let page = 0; //first page
  let pageSize = 3; //optional, 10 by default

  function cellOnClick(row) {
    alert(JSON.stringify(row));
  }

  function onSortString({ detail: { dir, key } }) {
    rows = [...rows].sort((a, b) =>
      dir === "asc"
        ? ("" + a[key]).localeCompare(b[key])
        : ("" + b[key]).localeCompare(a[key])
    );
  }

  function onSortNumber({ detail: { dir, key } }) {
    rows = [...rows].sort((a, b) =>
      dir === "asc" ? a[key] - b[key] : b[key] - a[key]
    );
  }
</script>

<Table bind:page {rows} {pageSize} let:rows={rows2}>
  <thead slot="head">
    <tr>
      <td>
        Name
        <Sort key="name" on:sort={onSortString} />
      </td>
      <td>
        Lastname
        <Sort key="lastName" on:sort={onSortString} />
      </td>
      <td>
        Age
        <Sort key="age" on:sort={onSortNumber} />
      </td>
    </tr>
  </thead>
  <tbody>
    {#each rows2 as row, index (row)}
      <Row {index} on:click={() => cellOnClick(row)}>
        <td>{row.name}</td>
        <td>{row.lastName}</td>
        <td>{row.age}</td>
      </Row>
    {/each}
  </tbody>
</Table>
```
