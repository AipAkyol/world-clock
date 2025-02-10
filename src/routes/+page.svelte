<script>
  import WorldClockCard from "$lib/components/WorldClockCard.svelte";
  import AddNewCity from "$lib/components/AddNewCity.svelte";
  import { continentsAndCities } from "$lib/stores/ContinentsAndCitiesStore";
  import DeleteCities from "$lib/components/DeleteCities.svelte";

  let clockCities = [];
  continentsAndCities.subscribe((data) => {
    clockCities = data;
  });
</script>

<div class="page-container">
  <div class="page-header">
    <h1>World Clock</h1>
    <p class="subtitle">Track time across different cities around the world</p>
  </div>

  <div class="clock-container">
    {#each clockCities as info}
      <WorldClockCard
        continent={info[0]}
        city={info[1]}
      />
    {/each}
  </div>

  <div class="actions-container">
    <AddNewCity />
    <DeleteCities />
  </div>
</div>

<style>
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 3rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    color: #64748b;
    font-size: 1.1rem;
  }

  .clock-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .actions-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 500px;
    margin: 3rem auto;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    .clock-container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style> 