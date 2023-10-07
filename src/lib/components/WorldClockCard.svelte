<!-- Clock.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    export let city;
    export let continent;
    let currentTime;
    let isLoading = true; // Initialize as loading
  

    function updateTime() {
      const newDate = new Date(currentTime)
      newDate.setSeconds(newDate.getSeconds()+1)
      currentTime = newDate;
    }
  
    let interval;
    onMount(async () => {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${continent}/${city}`);
      isLoading = false;
      const data = await response.json();
      currentTime = new Date(data.datetime);
      interval = setInterval(updateTime, 1000);
    });
  
    onDestroy(() => {
      clearInterval(interval); // Cleanup the interval when the component is unmounted
    });
  </script>
  
  <div class="clock"> <!-- Add class here -->
    <h2>Current time in {city.replace(/_/g, " ")}</h2>
    {#if isLoading}
      <p>Loading...</p>
    {:else}
      <p>{currentTime}</p>
    {/if}
  </div>
  
  <style>
    .clock {
      text-align: center;
      font-size: 12pt;
      font-weight: bold;
      background-color: blanchedalmond;
      border-radius: 10px;
      padding: 10px;
      border: solid 2px;
    }
    p {
        font-weight: normal; /* Change 'normal' to the desired font weight */
    }
  </style>