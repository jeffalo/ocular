<template>
  <div class="container">
    <Header pageName="privacy" pageLink="/privacy"/>
    <div class="margined">
      <h1>privacy</h1>
      <p>
        ocular uses a number of services to provide various tools to enhance the
        experience. these services may collect and or use data according to
        their individual privacy policies.
      </p>
      <p>
        this site uses a self-hosted instance of
        <a href="https://plausible.io/">plausible analytics</a> to track website
        usage. you can find out what kind of information is collected at the
        <a href="https://plausible.io/">plausible analytics website</a>.
      </p>
      <p>
        this website is hosted at home with
        <a href="https://cloudflare.com">cloudflare</a> proxy.
      </p>
      <p>
        the scratch data comes from
        <a href="https://scratchdb.lefty.one">scratchdb</a> (forum post data and
        APIs),
        <a href="https://fluffyscratch.hampton.pw">fluffyscratch</a> (profile
        picture and auth api)
        <a href="https://api.scratch.mit.edu">scratch api</a> (scratch's official api)
      </p>
      <p>it is important to note that ocular does not store any scratch data. it only
        presents data from the apis listed above. i only store data that powers the
        ocular login and profile customization. the data can be deleted on the
        <nuxt-link to="/dashboard">dashboard</nuxt-link>
      </p>
      <p>
        for external services, please consult their sites for information about
        how data is stored and used, if you have any questions about your
        privacy when using ocular feel free to contact me and ask about it.
      </p>
    <Footer />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'privacy'
  },
}
</script>