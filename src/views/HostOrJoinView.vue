<template>
  <body>

  <div>

    <router-link v-bind:to="'/gamemode/'"><button>Host</button></router-link>
    <br>
    <router-link v-bind:to="'/clientjoingame/'"><button>Join</button></router-link>
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
  name: "HostOrJoinView"
}
</script>

<style scoped>

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(253,52,76);
  background: radial-gradient(circle, rgba(253,52,76,1) 35%, rgba(182,49,65,1) 90%);

}

</style>