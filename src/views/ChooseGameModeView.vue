<template>
  <body>
  <div style="margin: 2em">
    <router-link v-bind:to="'/hostorjoin'"><button>Back</button></router-link>
  </div>
  <div>
    <button>PLAY SAVED QUIZ</button>
    <button>CREATE COLLABORATIVE QUIZ</button>
  </div>
  </body>
</template>

<script>
export default {
  name: "ChooseGameModeView"
}
</script>

<style scoped>

</style>