<template>
  <div class="container">
    <Header />
    <div class="margined">
      <h1>ocular</h1>
      <p>scratch forum search and more!</p>
      <div class="grid">
        <!-- todo why is this grid smaller? -->
        <nuxt-link to="/search">
          <div class="content"><span><Emoji>🔍</Emoji> search</span></div>
        </nuxt-link>
        <nuxt-link to="/browse">
          <div class="content"><span><Emoji>🌐</Emoji> browse</span></div>
        </nuxt-link>
        <nuxt-link to="/dashboard">
          <div class="content"><span><Emoji>💻</Emoji> dashboard</span></div>
        </nuxt-link>
        <nuxt-link to="/docs">
          <div class="content"><span><Emoji>📜</Emoji> docs</span></div>
        </nuxt-link>
        <!-- 
        <a href="stats.html">
          <div class="content"><span>📊 stats</span></div>
        </a>
        <a href="live.html">
          <div class="content"><span>🔴 live</span></div>
        </a>
        -->
      </div>
      <Footer />
    </div>
  </div>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  grid-auto-rows: 1fr;
  /*fade*/
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.grid::before {
  content: "";
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

/* Just to make the grid visible */

.grid > * {
  background: var(--brand);
  margin: 1px;
  background-position: center center;
  background-size: cover;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  color: white;
  font-size: 135%;
  user-select: none;
  transition: 125ms;
  text-align: center;
}

.content:hover {
  backdrop-filter: brightness(0.75);
}

.content:active {
  backdrop-filter: brightness(0.5);
}
</style>