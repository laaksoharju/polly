<template>
  <body>
  <div style="margin: 2em">
    <router-link v-bind:to="'/'"><button>Back</button></router-link>
  </div>
  <div>

    <router-link v-bind:to="'/gamemode/'"><button>Host</button></router-link>
    <br>
    <router-link v-bind:to="'/clientjoingame/'"><button>Join</button></router-link>
  </div>
  </body>
</template>

<script>
export default {
  name: "HostOrJoinView"
}
</script>

<style scoped>

</style>