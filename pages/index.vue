<template>
  <div class="container">
    <Header />
    <div class="margined">
      <h1>ocular</h1>
      <p>ocular is the all in one forum tool for scratch</p>

      <div class="grid"> <!-- todo why is this grid smaller? -->
        <nuxt-link to="/search">
          <div class="content"><span>🔍 search</span></div>
        </nuxt-link>
        <nuxt-link to="/login">
          <div class="content"><span>🙋&zwj;♂️ login</span></div>
        </nuxt-link>
        <!-- 
        <a href="stats.html">
          <div class="content"><span>📊 stats</span></div>
        </a>
        <a href="live.html">
          <div class="content"><span>🔴 live</span></div>
        </a>
        -->   
        <a href="https://my-ocular.jeffalo.net">
          <div class="content my-ocular">
            <span>🙋&zwj;♂️ my-ocular</span>
          </div>
        </a>
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
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.grid>*:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

/* Just to make the grid visible */

.grid>* {
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
  font-size: 150%;
  user-select: none;
  transition: 125ms;
  text-align: center;
}

.my-ocular{
  font-size: 125%
}

.content:hover {
  font-size: 160%;
}

.my-ocular:hover {
  font-size: 135%;
}

.content:active {
  backdrop-filter: brightness(0.5);
}

.content>span {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>