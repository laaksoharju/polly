<template>
  <body>

 <div>
   <p>Host pre game</p>
 </div>
 <div style="margin: 2em">
   <router-link v-bind:to="'/poll/:id'"><button type="submit" v-on:click="starter">start</button></router-link>
 </div>

  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">Back</button>
    </div>
  </footer>
  </body>
</template>

<script>
//import io from 'socket.io-client'

//const socket = io();

export default {
  name: "HostPreGame",
  data: function () {
    return {

    }
  },

  methods:{
   /* setTrue: function (){
      this.startButton = true
    },
    starter: function (){
      socket.emit("setTrue")
    }*/
  }
}

</script>

<style scoped>

</style>