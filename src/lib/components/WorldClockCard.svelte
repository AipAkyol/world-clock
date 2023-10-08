<!-- Clock.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    export let city;
    export let continent;
    let currentTime;
    let parsedTime;

    function updateTime() {
      const newDate = new Date(currentTime)
      newDate.setSeconds(newDate.getSeconds()+1)
      currentTime = newDate;
      const hours = currentTime.getHours()
      const minutes = currentTime.getMinutes()
      const seconds = currentTime.getSeconds()
      parsedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    let interval;
    onMount(async () => {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${continent}/${city}`);
      const data = await response.json();
      const [datePart, timePart] = data.datetime.split('T');
      let timeWithoutOffset;
      if (timePart.includes("-")) {
        timeWithoutOffset = timePart.split('-')[0];
      } else{
        timeWithoutOffset = timePart.split("+")[0];
      }
      // Combine the date and time parts and create a new Date object
      currentTime = new Date(`${datePart}T${timeWithoutOffset}`);
      interval = setInterval(updateTime, 1000);
    });
  
    onDestroy(() => {
      clearInterval(interval); // Cleanup the interval when the component is unmounted
    });
  </script>
  
  <div class="clock"> <!-- Add class here -->
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