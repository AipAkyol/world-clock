<script>    
    import WorldClockCard from "../lib/components/WorldClockCard.svelte";
    import AddNewCity from "$lib/components/AddNewCity.svelte";
    import { continentsAndCities } from "$lib/stores/ContinentsAndCitiesStore";
    import DeleteCities from "$lib/components/DeleteCities.svelte";

    let clockCities = []
    continentsAndCities.subscribe((data) => {
        clockCities = data;
    })
</script>

<div>
    Home Page
</div>

<div class="clock-container">
    {#each clockCities as info}
      <WorldClockCard
        continent={info[0]}
        city={info[1]}
      />
    {/each}
</div>
<AddNewCity></AddNewCity>
<DeleteCities></DeleteCities>

<style>
    .clock-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
        justify-content: center;
    }
</style>