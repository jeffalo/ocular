<template>
  <div :class="{ error: true, fullwidth: fullwidth }">
    <h1>{{ error }}</h1>
    <p>{{ details }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: "Error",
    },
    details: {
      type: String,
      default: "We hit an error we weren't prepared for.",
    },
    fullwidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.error {
  background-color: var(--input-background);
  width: max-content;
  padding: 20px 30px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--quote-border);
  border-radius: 5px;
  margin: 20px 0;
}

p {
  color: var(--footer-text);
}

@media only screen and (max-width: 800px) {
  .error {
    width: 100%;
    margin: auto;
    margin-bottom: 20px;
    text-align: center;
  }
}

.fullwidth {
  width: 100%;
  text-align: center;
}
</style>