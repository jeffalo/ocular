<template>
  <form @submit.prevent="changeForum(selectedForum)">
    <select v-model="selectedForum">
      <optgroup label="Welcome to Scratch">
        <option value="5">Announcements</option>
        <option value="6">New Scratchers</option>
      </optgroup>
      <optgroup label="Making Scratch Projects">
        <option value="7">Help with Scripts</option>
        <option value="8">Show and Tell</option>
        <option value="9">Project Ideas</option>
        <option value="10">Collaboration</option>
        <option value="11">Requests</option>
      </optgroup>
      <optgroup label="About Scratch">
        <option value="4">Questions about Scratch</option>
        <option value="1">Suggestions</option>
        <option value="3">Bugs and Glitches</option>
        <option value="31">Advanced Topics</option>
        <option value="32">Connecting to the Physical World</option>
        <option value="48">Developing Scratch Extensions</option>
        <option value="49">Open Source Projects</option>
      </optgroup>
      <optgroup label="Interests Beyond Scratch">
        <option value="29">Things I’m Making and Creating</option>
        <option value="30">Things I’m Reading and Playing</option>
      </optgroup>
      <optgroup label="Scratch Around the World">
        <option value="55">Africa</option>
        <option value="36">Bahasa Indonesia</option>
        <option value="33">Català</option>
        <option value="13">Deutsch</option>
        <option value="26">Ελληνικά</option>
        <option value="14">Español</option>
        <option value="59">فارسی</option>
        <option value="15">Français</option>
        <option value="22">עברית</option>
        <option value="23">한국어</option>
        <option value="21">Italiano</option>
        <option value="19">Nederlands</option>
        <option value="18">日本語</option>
        <option value="24">Norsk</option>
        <option value="17">Polski</option>
        <option value="20">Português</option>
        <option value="27">Pусский</option>
        <option value="25">Türkçe</option>
        <option value="16">中文</option>
        <option value="34">
          Other Languages For languages not listed above
        </option>
        <option value="28">Translating Scratch</option>
      </optgroup>
    </select>
    <button type="submit" class="form-button">go</button>
  </form>
</template>

<script>
export default {
  props: ["selected"],
  data() {
    return {
      selectedForum: this.selected,
    };
  },
  methods: {
    changeForum(newID) {
      this.$router.push({
        path: `/browse/${newID}`,
      });
    },
  },
};
</script>

<style scoped>
select {
  width: 50%;
}
</style>
