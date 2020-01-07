<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let text = "";

  function onSearch() {
    dispatch("search", text);
  }
</script>

<style>
  .search {
    width: 33.3%;
    float: right;
  }
  .search input {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 1px 3px;
  }

  @media screen and (max-width: 767px) {
    .search {
      width: 100%;
    }
  }
</style>

<div class="search">
  <input
    type="search"
    placeholder="Search"
    bind:value={text}
    on:keyup={onSearch} />
</div>
