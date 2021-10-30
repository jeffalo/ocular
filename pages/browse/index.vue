<template>
  <div class="container">
    <Header :crumbs="[{ link: `/browse/${id}`, text: 'browse' }]" />
    <div class="margined">
      <h1>browse topics</h1>
      <p>note: this feature is in beta and may be changed at any time. it's also a bit slow due to scratchdb things.</p>
      <ForumSelector selected="31" />
      <Footer />
    </div>
  </div>
</template>
