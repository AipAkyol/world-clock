<script>
    import WorldClockCard from "../lib/components/WorldClockCard.svelte";
    import ContinentsData from '$lib/components/ContinentsData.svelte';
    import { fetchedContinentsData } from '../lib/components/FetchedDataStore';
    let citiesAndContinents = [
    ["America" , "New_York"],
    ["Europe", "London"]]
    let continentsData = {};
    fetchedContinentsData.subscribe((data) => {
        continentsData = data;
    })
    let tempCity = "";
    let tempContinent = "";
    let citiesOfSelectedContinent = [];
    let citySelectPlaceholder = "Please select a continent first";
    
    

    function handleContinentChange(event) {
        tempContinent = event.target.value;
        // Enable the city select and populate it with cities of the selected continent
        citiesOfSelectedContinent = continentsData[tempContinent] || [];
        tempCity = ''; // Reset selected city when the continent changes

        // Set the city select placeholder based on whether a continent is selected
        citySelectPlaceholder = tempContinent ? "Please select a city" : "Please select a continent first";
    }

    function addNewCity() {
        const tempArray = citiesAndContinents;
        tempArray.push([tempContinent,tempCity])
        citiesAndContinents = tempArray;
    }
  
</script>
<div>
    Home Page
</div>
<ContinentsData></ContinentsData>
<div class="clock-container">
    {#each citiesAndContinents as info}
      <WorldClockCard
        continent={info[0]}
        city={info[1]}
      />
    {/each}
</div>

<label for="continentSelect">Select a Continent:</label>
<select id="continentSelect" bind:value={tempContinent} on:change={handleContinentChange}>
  {#each Object.keys(continentsData) as continent}
    <option value={continent}>{continent}</option>
  {/each}
</select>

<label for="citySelect">Select a City:</label>
<select id="citySelect" bind:value={tempCity} disabled={!tempContinent}>
  <option value="" disabled>{citySelectPlaceholder}</option>
  {#each citiesOfSelectedContinent as city}
    <option value={city}>{city.replace(/_/g, " ")}</option>
  {/each}
</select>

<button
  on:click={addNewCity}
  disabled={!tempCity}
>Submit</button>

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