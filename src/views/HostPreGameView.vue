<template>
  <body>
    <div>
      <p>Host pre game</p> <br>
      <router-link v-bind:to="'/poll/:id'"><button>Start</button></router-link>
    </div>

    <footer>
      <div style="margin: 2em">
        <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">Back</button>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  name: "HostPreGame"
}
</script>

<style scoped>

</style>