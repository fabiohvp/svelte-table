<script>
	import LocalTable from './LocalTable.svelte';
	import RemoteTable from './RemoteTable.svelte';
	import './reset.css';
</script>

<div class="box">
	<h4>Client side processing</h4>
	<LocalTable />
</div>
<div class="box">
	<h4>Server side processing</h4>
	<RemoteTable />
</div>

<style>
	.box {
		border: 1px solid #eee;
		padding: 1em 1em;
		margin: 1em 1em;
	}
</style>
