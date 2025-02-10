<script>
  import { continentsAndCities } from "$lib/stores/ContinentsAndCitiesStore";
  import { browser } from '$app/environment';

  function deleteCities() {
    if (browser) {
      continentsAndCities.set([]);
    }
  }
</script>

<button class="delete-btn" on:click={deleteCities}>
  <span class="icon">🗑️</span>
  Delete All Cities
</button>

<style>
  .delete-btn {
    background-color: #ef4444;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .delete-btn:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
  }

  .icon {
    font-size: 1.1em;
  }
</style> 