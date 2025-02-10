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
  onMount(() => {
    interval = setInterval(updateTime, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="clock-card">
  <h2>Current time in {city.replace(/_/g, " ")}</h2>
  {#if !parsedTime}
    <div class="loading">Loading...</div>
  {:else}
    <div class="time">{parsedTime}</div>
  {/if}
</div>

<style>
  .clock-card {
    background: linear-gradient(135deg, var(--card-background), #f8fafc);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    transition: var(--transition);
    text-align: center;
  }

  .clock-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.1);
  }

  h2 {
    color: var(--text-color);
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .time {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    font-family: 'Inter', monospace;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .loading {
    font-size: 1.2rem;
    color: var(--text-color);
    opacity: 0.7;
  }
</style> 