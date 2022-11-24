<template>
  <body>
  <div style="margin: 2em">
    <router-link v-bind:to="'/hostorjoin'"><button>Back</button></router-link>
  </div>
 <div>
   Host pre game
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