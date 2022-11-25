<template>
  <body>
<div>
  <router-link v-bind:to="'/clientjoingame/'"><button>Back</button></router-link>
  <div>
    <p>#nickname</p>
    <router-link v-bind:to="'/poll/:id'"><button>Start</button></router-link>
  </div>
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
  name: "LobbyView"
}
</script>

<style scoped>

</style>