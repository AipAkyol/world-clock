<!-- Clock.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    import getTime from '$lib/getTime';
    export let city;
    export let continent;
    let time = getTime(continent,city);
    let parsedTime;

    function updateTime() {
      time = getTime(continent,city);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      parsedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    let interval;
    onMount(async () => {
      
      interval = setInterval(updateTime, 1000);
    });
  
    onDestroy(() => {
      clearInterval(interval); // Cleanup the interval when the component is unmounted
    });
  </script>
  

  <div class="clock">
    <h2>Current time in {city.replace(/_/g, " ")}</h2>
    {#if !parsedTime}
      <p>Loading...</p>
    {:else}
      <p>{parsedTime}</p>
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