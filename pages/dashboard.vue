<template>
  <div class="container">
    <Header pageName="dashboard" pageLink="/dashboard" />
    <div class="margined">
      <h1>account dashboard</h1>
      <p>loggedin {{$auth.loggedIn()}}</p>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>