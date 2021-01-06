<template>
  <div class="container">
    <Header pageName="xss info" pageLink="/xss-info" />
    <div class="margined">
      <h1>why don't some posts render?</h1>
      <p>
        as you may know, ocular gets data from
        <a href="https://scratchdb.lefty.one">scratchdb</a>. due to a
        misconfiguration, attackers could input html and perform an xss attack
        on ocular.
      </p>
      <p>to be honest the worst thing they could do would be rickroll you, however just to be safe, posts which haven't been reindexed will not render.</p>
      <p>soon, every post will have been reindexed, and every post will render normally.</p>
      <Footer />
    </div>
  </div>
</template>