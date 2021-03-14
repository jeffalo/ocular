<script>
  export default {
    middleware(context) {
        return context.redirect(`/post/${context.route.params.id}`)
    }
  }
</script>