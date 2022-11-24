<template>
  <body>
  <div>
    <router-link v-bind:to="'/selectsavedgame'"><button>PLAY SAVED QUIZ</button></router-link>
    <button>CREATE COLLABORATIVE QUIZ</button>
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
  name: "ChooseGameModeView"
}
</script>

<style scoped>

</style>