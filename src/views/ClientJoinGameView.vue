<template>
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
    <button>
      Join game
    </button>
  </div>
</template>

<script>
export default {
  name: "ClientJoinGameView"
}
</script>

<style scoped>

</style>