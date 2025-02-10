<script>
  import { continentsAndCities } from '$lib/stores/ContinentsAndCitiesStore';
  import timezones from '$lib/data/timezones.json';
  
  let tempCity = "";
  let tempContinent = "";
  let citiesOfSelectedContinent = [];
  let citySelectPlaceholder = "Please select a continent first";

  function handleContinentChange(event) {
    tempContinent = event.target.value;
    citiesOfSelectedContinent = [];
    for (let city in timezones[tempContinent]) {
      citiesOfSelectedContinent.push(city);
    }
    tempCity = '';
    citySelectPlaceholder = tempContinent ? "Please select a city" : "Please select a continent first";
  }

  function addNewCity() {
    let tempArray = [];
    continentsAndCities.subscribe((data) => {
      tempArray = data;
    });
    const isCityAlreadyAdded = tempArray.some(([continent, city]) => {
      return continent === tempContinent && city === tempCity;
    });
    if (isCityAlreadyAdded) {
      alert("City already added!");
      return;
    }
    tempArray.push([tempContinent, tempCity]);
    continentsAndCities.set(tempArray);
  }
</script>

<div class="add-city-form">
  <div class="select-group">
    <label for="continentSelect">Select a Continent:</label>
    <select id="continentSelect" bind:value={tempContinent} on:change={handleContinentChange}>
      <option value="" disabled>Please select a continent</option>  
      {#each Object.keys(timezones) as continent}
        <option value={continent}>{continent}</option>
      {/each}
    </select>
  </div>

  <slot name="cityheader"></slot>

  <div class="select-group">
    <label for="citySelect">Select a City:</label>
    <select id="citySelect" bind:value={tempCity} disabled={!tempContinent}>
      <option value="" disabled>{citySelectPlaceholder}</option>
      {#each citiesOfSelectedContinent as city}
        <option value={city}>{city.replace(/_/g, " ")}</option>
      {/each}
    </select>
  </div>

  <button class="submit-btn" on:click={addNewCity} disabled={!tempCity}>Add City</button>
</div>

<style>
  .add-city-form {
    background: var(--card-background);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .select-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    color: var(--text-color);
    font-weight: 500;
    font-size: 0.9rem;
  }

  select {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: var(--border-radius);
    background-color: white;
    font-size: 1rem;
    transition: var(--transition);
  }

  select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  select:disabled {
    background-color: #f1f5f9;
    cursor: not-allowed;
  }

  .submit-btn {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    margin-top: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: var(--secondary-color);
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style> 