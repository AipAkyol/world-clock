<script>
    import { onMount } from 'svelte';
    import { fetchedContinentsData } from './FetchedDataStore.js';
    
    let fetchedData = {};
    
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
        if (!fetchedData[dataContinent]) {
          fetchedData[dataContinent] = [];
        }

        fetchedData[dataContinent].push(dataCity);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    }
    
    // Fetch data when the component is mounted
    onMount(async () => {
        await fetchData();
        fetchedContinentsData.set(fetchedData);
    });


</script>