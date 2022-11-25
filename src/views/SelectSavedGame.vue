<template>
  <body>
  <div>
    <div>
      <h3>{{uiLabels.chooseOrEdit}}</h3>
      <ul>
        <li>
          {{uiLabels.theGamesName}}
          <router-link v-bind:to="'/hostpregame/'+lang"><button>{{uiLabels.startTheGame}}</button></router-link>
          <router-link v-bind:to="'/create/'+lang"><button>{{uiLabels.editTheGame}}</button></router-link>
        </li>
      </ul>
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
import io from 'socket.io-client';
const socket = io();

export default {
  name: "SelectSavedGame",

  data: function () {
    return {
      uiLabels: {},
      lang: "",
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
  },
}
</script>

<style scoped>

</style>