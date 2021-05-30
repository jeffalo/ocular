<template>
  <span>
    {{ date }}
  </span>
</template>

<script>
export default {
  props: ["time"],
  computed: {
    date() {
      let date = new Date(this.time);
      let now = new Date();

      let day = `${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        date
      )}  ${date.getDate()},`;

      let year = ` ${date.getFullYear()}`;

      if (now.getDate() == date.getDate()) {
        day = "Today";
        year = "";
      }

      if (now.getDate() - 1 == date.getDate()) {
        day = "Yesterday";
        year = "";
      }

      let time = ` ${("0" + date.getHours()).slice(-2)}:${(
        "0" + date.getMinutes()
      ).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;

      return `${day}${year}${time}`;
    },
  },
};
</script>