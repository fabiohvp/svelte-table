# Svelte-table

Make your tables using HTML and leave the javascript only for user interaction (pagination/search/sort);

`npm install @fabiohvp/svelte-table`  
or  
`yarn add @fabiohvp/svelte-table`

## Examples

You can see the examples in [Sveltelab.dev](https://www.sveltelab.dev/vs33nnuign7coeb)

PS:. examples are using tableStore to manage table data but it can be managed with local variables

## Advanced

- You can add components to the top or bottom slots.
- Adding top/bottom slot will override the default content (Search/Pagination) but you can still use it by importing and adding them inside your custom slot.
- You can change the default search method by adding an on:search event on Search component.
- Row component is optional and only serves to render odd/even row, you can use <tr> instead.
- Sort component expect "key" and you need to implement your own sorting method (see the example below).

## Roadmap

- Add tests