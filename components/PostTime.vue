<template>
    <a :href="`?post=${linkid}`" class="date">{{ new Date(time) }}</a>
</template>

<script>
export default {
    props: ["time", "linkid"],
    ssr: false
}
</script>