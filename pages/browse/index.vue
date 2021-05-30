<template>
  <div class="container">
    <Header :crumbs="[{ link: `/browse/${id}`, text: 'browse' }]" />
    <div class="margined">
      <h1>browse topics</h1>
      <p>note: this feature is in beta and may change at any time. also it's a bit slow due to scratchdb things.</p>
      <ForumSelector selected="31" />
      <Footer />
    </div>
  </div>
</template>