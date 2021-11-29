<!--Hej emil -->

<template>
  <header id="head">
    <button id="bytsprak" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <h1>
      Header
    </h1>
  </header>
  <div id="nav">

    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <label>

      Write poll id:

      <input type="text" v-model="id">
    </label>
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>

<style>

#head{
  height: 200px;
  width: 100%;
  overflow: hidden;
}
#bytsprak{
  position: absolute;
  top: 10px;
  right: 10px;
}

#nav{
  background-color: #775a48;
  color: white;
}

</style>