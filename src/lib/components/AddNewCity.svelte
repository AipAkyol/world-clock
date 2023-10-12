<script>
    import { fetchedContinentsData } from './FetchedDataStore';
    import { continentsAndCities } from './ContinentsAndCitiesStore';

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
        let tempArray = continentsAndCities.data;
        continentsAndCities.subscribe((data) => {
            tempArray = data;
        })
        tempArray.push([tempContinent,tempCity])
        continentsAndCities.set(tempArray);
    }

    function hey(){console.log("hey")}

</script>



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
  on:click={hey}
  disabled={!tempCity}
>Submit</button>
