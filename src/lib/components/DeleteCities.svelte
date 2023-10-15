<script>
    import { continentsAndCities } from "$lib/stores/ContinentsAndCitiesStore";
    import { browser } from '$app/environment';

    function deleteCities() {
        if (browser) {
            continentsAndCities.set([]);
        }
    }
</script>

<button
    on:click={deleteCities}
>Delete Stored Cities</button>