<script>
  import "../app.css";
</script>

<nav class="nav-bar">
  <div class="nav-content">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/about">About</a></div>
    <div class="nav-item"><a href="/items/item1">Item 1</a></div>
    <div class="nav-item"><a href="/items/item2">Item 2</a></div>
    <div class="nav-item"><a href="/items/item3">Item 3</a></div>
  </div>
</nav>

<main class="main-container">
  <slot />
</main>

<style>
  .nav-bar {
    background: linear-gradient(to right, #1e293b, #334155);
    padding: 0.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    flex-wrap: wrap;
  }

  .nav-item a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1.25rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    display: block;
  }

  .nav-item a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 4rem);
  }

  @media (max-width: 768px) {
    .nav-content {
      justify-content: center;
    }
    
    .main-container {
      padding: 1rem;
    }
  }
</style> 