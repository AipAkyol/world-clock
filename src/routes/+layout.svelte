<script>
	import Navigation from "../lib/components/Navigation.svelte";

</script>
<Navigation></Navigation>
<div class="main-container">
    <slot></slot>
</div>
<style>
    .main-container{margin: 10px 20px;}
</style>