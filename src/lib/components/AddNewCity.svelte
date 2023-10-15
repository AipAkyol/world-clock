<script>
    import { fetchedContinentsData } from './FetchedDataStore';
    import { continentsAndCities } from './ContinentsAndCitiesStore';

    let continentsData = {};
    fetchedContinentsData.subscribe((data) => {
        continentsData = data;
        console.log(continentsData);
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
        let tempArray = [];
        continentsAndCities.subscribe((data) => {
            tempArray = data;
        })
        const isCityAlreadyAdded = tempArray.some(([continent, city]) => {
          return continent === tempContinent && city === tempCity;
        });
        if (isCityAlreadyAdded){
          alert("City already added!");
          return;
        }
        tempArray.push([tempContinent,tempCity])
        continentsAndCities.set(tempArray);
    }

</script>



<label for="continentSelect">Select a Continent:</label>
<select id="continentSelect" bind:value={tempContinent} on:change={handleContinentChange}>
  <option value="" disabled>Please select a continent</option>  
  {#each Object.keys(continentsData) as continent}
    <option value={continent}>{continent}</option>
  {/each}
</select>
<slot name="cityheader"></slot>
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
