<script>
    import { onMount } from 'svelte';
    import WorldClockCard from "../lib/components/WorldClockCard.svelte"

    let citiesAndContinents = [
    ["America" , "New_York"],
    ["Europe" , "London"]
    ]
    let tempCity = "";
    let tempContinent = "";   
    let continentsData = {};
    let citiesOfSelectedContinent = [];
    let citySelectPlaceholder = "Please select a continent first";
    
    async function fetchData() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone');
      const data = await response.json();

      // Iterate through the data and organize it into continents and cities
      data.forEach(timezone => {
        const parts = timezone.split('/');
        const dataContinent = parts[0];
        let dataCity;
        if (parts.length>2){
          dataCity = parts[1] + "/" + parts[2];
        }
        else{
          dataCity = parts[1];
        }
        if ((dataCity == undefined) || (dataContinent == "Etc")) {
          return;
        }
        // Create a continent entry if it doesn't exist
        if (!continentsData[dataContinent]) {
          continentsData[dataContinent] = [];
        }

        continentsData[dataContinent].push(dataCity);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    }
    
    // Fetch data when the component is mounted
    onMount(() => {
        fetchData();
    });
    

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