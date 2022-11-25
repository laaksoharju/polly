<template>

  <body>
  <div>


    <!-- view text-->
    <div>
      Enter game-ID
    </div>

    <!-- Text field where you enter nickname -->
    <form>
      <p>
        <label for="gameid"></label> <br>
        <input type="text" placeholder="#game-ID">
      </p>
    </form>
  <div>
    Who are you?
  </div>
    <form>
      <p>
        <label for="nickname"></label> <br>
        <input type="text" placeholder="enter nickname...">
      </p>
    </form>

    <!-- Button for joining game -->
    <router-link v-bind:to="'/lobby'"><button>Join Game </button></router-link>
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
  name: "ClientJoinGameView"
}
</script>

<style scoped>

</style>