<script>
  export default {
    middleware(context) {
        return context.redirect(`/youtube/${context.route.params.id}`)
    }
  }
</script>