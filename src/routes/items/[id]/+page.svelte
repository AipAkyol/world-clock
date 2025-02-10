<script>
    export let data;
</script>

<div class="item-container">
    <h1>Item Details</h1>
    <p class="item-id">ID: {data.id}</p>
</div>

<style>
    .item-container {
        background-color: var(--card-background);
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        max-width: 600px;
        margin: 2rem auto;
    }

    h1 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .item-id {
        font-size: 1.2rem;
        color: var(--secondary-color);
    }
</style>