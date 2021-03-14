<script>
  export default {
    middleware(context) {
        return context.redirect(`/user/${context.route.params.username}`)
    }
  }
</script>