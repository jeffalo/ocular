<script>
  export default {
    middleware(context) {
        return context.redirect(`/topic/${context.route.params.id}`)
    }
  }
</script>